/**
 * Utility to check if a password has been compromised in known data breaches
 * using the Have I Been Pwned API with k-anonymity model for privacy
 */

/**
 * Creates a SHA-1 hash of the password
 * @param password The password to hash
 * @returns Promise resolving to the SHA-1 hash as an uppercase hex string
 */
async function sha1Hash(password: string): Promise<string> {
  // Encode the password as UTF-8
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Generate the SHA-1 hash
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  
  // Convert the hash to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex.toUpperCase();
}

/**
 * Checks if a password has been exposed in known data breaches
 * Uses the k-anonymity model, where only the first 5 chars of the hash are sent to the API
 * 
 * @param password The password to check
 * @returns An object with breach information or null if request failed
 */
export async function checkPasswordBreach(password: string): Promise<{ 
  breached: boolean; 
  count: number;
  prefix: string;
  suffix: string;
} | null> {
  try {
    // Generate SHA-1 hash of the password
    const hash = await sha1Hash(password);
    
    // Split the hash into prefix (first 5 chars) and suffix (remainder)
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);
    
    // Make request to the API with only the prefix (k-anonymity)
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'Add-Padding': 'true',  // Makes timing attacks harder
        // 'User-Agent': 'password-generator-app'  // Identify our application
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    // Get the text response and split into lines
    const text = await response.text();
    const lines = text.split('\n');
    
    // Look for our hash suffix in the results
    const match = lines.find(line => {
      const [hashSuffix] = line.split(':');
      return hashSuffix === suffix;
    });
    
    if (match) {
      // Extract occurrence count from the matching line
      const count = parseInt(match.split(':')[1], 10);
      return {
        breached: true,
        count,
        prefix,
        suffix
      };
    }
    
    // Password not found in breaches
    return {
      breached: false,
      count: 0,
      prefix,
      suffix
    };
    
  } catch (error) {
    console.error('Error checking password breach:', error);
    return null;
  }
}

/**
 * Get a human-friendly description of the compromise severity
 * @param count The number of times the password has appeared in breaches
 * @returns A string describing the severity
 */
export function getBreachSeverity(count: number): string {
  if (count === 0) return 'Safe';
  if (count === 1) return 'Vulnerable';
  if (count < 10) return 'Compromised';
  if (count < 100) return 'Severely Compromised';
  if (count < 1000) return 'Critically Exposed';
  return 'Extremely Exposed';
}

/**
 * Get a recommendation based on breach status
 * @param breached Whether the password was found in breaches
 * @param count How many times it was found
 * @returns A recommendation string
 */
export function getBreachRecommendation(breached: boolean, count: number): string {
  if (!breached) {
    return 'This password has not been found in known data breaches.';
  }
  
  if (count === 1) {
    return 'This password has been exposed in a data breach. You should avoid using it.';
  } else if (count < 100) {
    return `This password has been exposed in ${count} data breaches. Definitely avoid using it.`;
  } else {
    return `This password has been exposed in ${count} data breaches. It is extremely unsafe to use.`;
  }
}

export default {
  checkPasswordBreach,
  getBreachSeverity,
  getBreachRecommendation
}; 