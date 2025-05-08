/**
 * List of common consonant combinations that appear in English words
 */
const consonantCombinations = [
  'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'qu', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z',
  'bl', 'br', 'ch', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sc', 'sh', 'sk', 'sl', 'sm', 'sn',
  'sp', 'st', 'sw', 'th', 'tr', 'tw', 'wh', 'wr'
];

/**
 * List of vowel combinations that appear in English words
 */
const vowelCombinations = [
  'a', 'e', 'i', 'o', 'u', 'y',
  'ae', 'ai', 'ay', 'ea', 'ee', 'ei', 'eu', 'ey', 'ie', 'oa', 'oe', 'oi', 'oo', 'ou', 'oy', 'ui'
];

/**
 * List of common syllable endings
 */
const syllableEndings = [
  'ck', 'ct', 'ft', 'ld', 'lf', 'lk', 'lp', 'lt', 'mp', 'nd', 'ng', 'nk', 'nt', 'pt', 'rd', 'rk', 'rm',
  'rn', 'rp', 'rt', 'sk', 'sp', 'ss', 'st', 'th'
];

/**
 * Picks a random item from an array
 * @param arr The array to pick from
 * @returns A random item from the array
 */
const getRandomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Capitalizes the first letter of a string
 * @param str The string to capitalize
 * @returns The capitalized string
 */
const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Generates a syllable that can be pronounced in English
 * @param withEnding Whether to include a syllable ending
 * @returns A pronounceable syllable
 */
const generateSyllable = (withEnding: boolean = false): string => {
  const consonant = getRandomItem(consonantCombinations);
  const vowel = getRandomItem(vowelCombinations);
  
  if (withEnding && Math.random() > 0.5) {
    const ending = getRandomItem(syllableEndings);
    return consonant + vowel + ending;
  }
  
  return consonant + vowel;
};

/**
 * Generates a pronounceable password of the specified length
 * @param length The target length of the password
 * @param includeNumbers Whether to include numbers
 * @param includeUppercase Whether to include uppercase letters
 * @param includeSymbols Whether to include symbols
 * @returns A pronounceable password
 */
export const generatePronounceablePassword = (
  length: number,
  includeNumbers: boolean = true,
  includeUppercase: boolean = true,
  includeSymbols: boolean = false
): string => {
  let password = '';
  const symbols = '!@#$%^&*_-+=?';
  
  // Generate syllables until we reach or exceed the desired length
  while (password.length < length) {
    // Add a syllable, possibly with an ending
    const withEnding = password.length + 4 < length;
    let syllable = generateSyllable(withEnding);
    
    // Capitalize some syllables if uppercase is enabled
    if (includeUppercase && Math.random() > 0.7) {
      syllable = capitalizeFirst(syllable);
    }
    
    password += syllable;
    
    // Add a number if enabled and randomly
    if (includeNumbers && Math.random() > 0.7 && password.length < length - 1) {
      password += Math.floor(Math.random() * 10);
    }
    
    // Add a symbol if enabled and randomly
    if (includeSymbols && Math.random() > 0.8 && password.length < length - 1) {
      password += symbols[Math.floor(Math.random() * symbols.length)];
    }
  }
  
  // Trim to exact length
  return password.slice(0, length);
};

export default generatePronounceablePassword; 