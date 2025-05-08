import { useState, useEffect } from 'react';
import { 
  checkPasswordBreach, 
  getBreachSeverity, 
  getBreachRecommendation 
} from '../../utils/password-breach-check';

interface PasswordBreachCheckProps {
  password: string;
}

/**
 * Component that checks if a password has been found in known data breaches
 * and displays the results to the user.
 */
const PasswordBreachCheck = ({ password }: PasswordBreachCheckProps) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    breached: boolean;
    count: number;
    prefix: string;
    suffix: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Get colored badge based on breach status
  const getSeverityBadge = () => {
    if (!result) return null;
    
    const severity = getBreachSeverity(result.count);
    let colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    
    if (result.breached) {
      if (result.count < 10) {
        colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      } else if (result.count < 100) {
        colorClass = 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      } else {
        colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      }
    }
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
        {severity}
      </span>
    );
  };
  
  // Check the password when it changes
  useEffect(() => {
    // Skip empty or invalid passwords
    if (!password || password.length < 3) {
      setResult(null);
      setError(null);
      return;
    }
    
    const checkBreaches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Wait for results from API
        const breachResult = await checkPasswordBreach(password);
        
        if (breachResult === null) {
          setError('Could not check password security. Please try again later.');
        } else {
          setResult(breachResult);
        }
      } catch (err) {
        setError('An error occurred while checking the password.');
        console.error('Password breach check error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small delay to avoid too many API requests when typing
    const timer = setTimeout(() => {
      checkBreaches();
    }, 800);
    
    return () => clearTimeout(timer);
  }, [password]);
  
  // Check manually (for when user clicks the button)
  const handleManualCheck = async () => {
    if (!password || password.length < 3) {
      setError('Please generate a password first.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const breachResult = await checkPasswordBreach(password);
      
      if (breachResult === null) {
        setError('Could not check password security. Please try again later.');
      } else {
        setResult(breachResult);
      }
    } catch (err) {
      setError('An error occurred while checking the password.');
      console.error('Password breach check error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Password Breach Check
        </h3>
        <button
          onClick={handleManualCheck}
          disabled={loading || !password || password.length < 3}
          className="text-xs px-3 py-1.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Check Now'}
        </button>
      </div>
      
      <div className="min-h-[150px] flex flex-col justify-between">
        <div className="min-h-[70px]">
          {error && (
            <div className="p-3 mb-3 text-xs bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-300 rounded">
              {error}
            </div>
          )}
          
          {!error && loading && (
            <div className="flex items-center justify-center p-3 mb-3">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
              <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">Checking password security...</span>
            </div>
          )}
          
          {!error && !loading && result && (
            <div>
              <div className="flex items-center mb-2">
                <span className="mr-2 text-xs text-gray-700 dark:text-gray-300">Status:</span>
                {getSeverityBadge()}
              </div>
              
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                {getBreachRecommendation(result.breached, result.count)}
              </p>
            </div>
          )}
          
          {!error && !loading && !result && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              This tool checks if your password has appeared in known data breaches.
              Generate a password to automatically check its security.
            </p>
          )}
        </div>
        
        <div className="mt-auto bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs text-gray-500 dark:text-gray-400">
          <p className="mb-1">
            For your privacy, this tool never sends your actual password to any server.
            Only the first 5 characters of a secure hash are transmitted.
          </p>
          <p>
            Check powered by{' '}
            <a 
              href="https://haveibeenpwned.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Have I Been Pwned
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordBreachCheck; 