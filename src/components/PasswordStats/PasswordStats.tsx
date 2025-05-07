import { useEffect, useState } from 'react';
import './PasswordStats.css';

interface PasswordStatsProps {
  password: string;
  passwordType: string;
  passwordOptions: {
    params: {
      id: number;
      value: string;
      isChecked: boolean;
    }[];
  };
}

/**
 * A component that displays statistics about the generated password
 * including strength rating and estimated time to crack.
 */
const PasswordStats = ({ password, passwordType, passwordOptions }: PasswordStatsProps) => {
  const [strength, setStrength] = useState<'weak' | 'moderate' | 'strong' | 'very-strong'>('weak');
  const [crackTime, setCrackTime] = useState('');
  const [entropy, setEntropy] = useState(0);

  // Calculate password entropy - a measure of password strength
  const calculateEntropy = (pass: string) => {
    // Get character set size based on password content
    let charSetSize = 0;
    const hasLowercase = /[a-z]/.test(pass);
    const hasUppercase = /[A-Z]/.test(pass);
    const hasNumbers = /[0-9]/.test(pass);
    const hasSymbols = /[^a-zA-Z0-9]/.test(pass);

    if (hasLowercase) charSetSize += 26;
    if (hasUppercase) charSetSize += 26;
    if (hasNumbers) charSetSize += 10;
    if (hasSymbols) charSetSize += 33; // Approximate number of symbols on a keyboard

    // Calculate entropy in bits
    return Math.log2(Math.pow(charSetSize, pass.length));
  };

  // Calculate time to crack based on entropy
  // Assumes 10 billion guesses per second (modern hardware)
  const calculateCrackTime = (entropyBits: number) => {
    const guessesPerSecond = 10000000000; // 10 billion
    const seconds = Math.pow(2, entropyBits) / guessesPerSecond;
    
    if (seconds < 1) return 'instantly';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    
    const scientificNotation = seconds.toExponential(2);
    return `${scientificNotation} years`;
  };

  // Set strength based on entropy
  const determineStrength = (entropyBits: number) => {
    if (entropyBits < 40) return 'weak';
    if (entropyBits < 60) return 'moderate';
    if (entropyBits < 80) return 'strong';
    return 'very-strong';
  };

  useEffect(() => {
    // Calculate stats when password changes
    const bits = calculateEntropy(password);
    setEntropy(Math.round(bits));
    setStrength(determineStrength(bits));
    setCrackTime(calculateCrackTime(bits));
  }, [password]);

  return (
    <div className="password-stats-container">
      <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Password Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Strength:</span>
          <div className="strength-meter">
            <div className={`strength-bar ${strength}`}></div>
            <span className="strength-text">{strength.replace('-', ' ')}</span>
          </div>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Entropy:</span>
          <span className="stat-value">{entropy} bits</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Time to crack:</span>
          <span className="stat-value">{crackTime}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Character types:</span>
          <span className="stat-value">
            {[/[a-z]/.test(password) ? 'lowercase' : '',
              /[A-Z]/.test(password) ? 'uppercase' : '',
              /[0-9]/.test(password) ? 'numbers' : '',
              /[^a-zA-Z0-9]/.test(password) ? 'symbols' : '']
              .filter(Boolean)
              .join(', ') || 'none'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStats; 