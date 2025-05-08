import { useEffect, useState } from 'react';

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
const PasswordStats = (
  { 
    password, 
    // passwordType, 
    // passwordOptions 
  }: PasswordStatsProps) => {
  const [strength, setStrength] = useState<'weak' | 'moderate' | 'strong' | 'very-strong'>('weak');
  const [crackTime, setCrackTime] = useState('');
  const [entropy, setEntropy] = useState(0);
  const [nistCompliant, setNistCompliant] = useState(false);
  const [charDistribution, setCharDistribution] = useState({ lowercase: 0, uppercase: 0, numbers: 0, symbols: 0 });
  const [uniquenessScore, setUniquenessScore] = useState(0);
  const [characterClassDiversity, setCharacterClassDiversity] = useState(0);
  const [memorabilityScore, setMemorabilityScore] = useState(0);
  const [vulnerabilityScore, setVulnerabilityScore] = useState({ dictionary: 0, bruteForce: 0 });
  const [standardsCompliance, setStandardsCompliance] = useState({ pci: false, hipaa: false });
  const [attackVectors, setAttackVectors] = useState<string[]>([]);
  const [similarCharScore, setSimilarCharScore] = useState(0);
  const [shannonEntropy, setShannonEntropy] = useState(0);

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

  // Calculate Shannon entropy - measures information content
  const calculateShannonEntropy = (pass: string) => {
    if (!pass) return 0;
    
    const len = pass.length;
    const charFreq: Record<string, number> = {};
    
    // Count character frequencies
    for (let i = 0; i < len; i++) {
      const char = pass[i];
      charFreq[char] = (charFreq[char] || 0) + 1;
    }
    
    // Calculate Shannon entropy
    return Object.values(charFreq).reduce((entropy, freq) => {
      const p = freq / len;
      return entropy - p * Math.log2(p);
    }, 0);
  };

  // Calculate character distribution
  const calculateCharDistribution = (pass: string) => {
    if (!pass) return { lowercase: 0, uppercase: 0, numbers: 0, symbols: 0 };
    
    let lowercase = 0, uppercase = 0, numbers = 0, symbols = 0;
    
    for (let i = 0; i < pass.length; i++) {
      const char = pass[i];
      if (/[a-z]/.test(char)) lowercase++;
      else if (/[A-Z]/.test(char)) uppercase++;
      else if (/[0-9]/.test(char)) numbers++;
      else symbols++;
    }
    
    return {
      lowercase: Math.round((lowercase / pass.length) * 100),
      uppercase: Math.round((uppercase / pass.length) * 100),
      numbers: Math.round((numbers / pass.length) * 100),
      symbols: Math.round((symbols / pass.length) * 100)
    };
  };

  // Check NIST compliance
  const checkNistCompliance = (pass: string) => {
    // NIST SP 800-63B guidelines (simplified version)
    const minLength = pass.length >= 8;
    const noRepeatedChars = !/(.)\1{2,}/.test(pass); // No more than 2 identical consecutive chars
    const notCommonPassword = !['password', '123456', 'qwerty'].includes(pass.toLowerCase());
    
    return minLength && noRepeatedChars && notCommonPassword;
  };

  // Calculate uniqueness score compared to common patterns
  const calculateUniquenessScore = (pass: string) => {
    if (!pass) return 0;
    
    // Check for common patterns
    const hasSequentialNumbers = /(?:012|123|234|345|456|567|678|789)/.test(pass);
    const hasKeyboardPatterns = /(?:qwert|asdf|zxcv)/.test(pass.toLowerCase());
    const hasRepeatedChars = /(.)\1{2,}/.test(pass);
    
    let score = 100;
    if (hasSequentialNumbers) score -= 30;
    if (hasKeyboardPatterns) score -= 30;
    if (hasRepeatedChars) score -= 20;
    
    return Math.max(0, score);
  };

  // Calculate character class diversity (0-100)
  const calculateCharacterClassDiversity = (pass: string) => {
    if (!pass) return 0;
    
    const classesUsed = [
      /[a-z]/.test(pass), // lowercase
      /[A-Z]/.test(pass), // uppercase
      /[0-9]/.test(pass), // numbers
      /[^a-zA-Z0-9]/.test(pass) // symbols
    ].filter(Boolean).length;
    
    return (classesUsed / 4) * 100;
  };

  // Calculate memorability score (higher = easier to remember)
  const calculateMemorabilityScore = (pass: string) => {
    if (!pass) return 0;
    
    // Factors that make passwords harder to remember
    const hasSymbols = /[^a-zA-Z0-9]/.test(pass);
    const hasRandomCase = /[a-z].*[A-Z]|[A-Z].*[a-z]/.test(pass);
    const hasNumbersInterspersed = /[a-zA-Z][0-9]|[0-9][a-zA-Z]/.test(pass);
    const isLong = pass.length > 12;
    
    let score = 100;
    if (hasSymbols) score -= 15;
    if (hasRandomCase) score -= 10;
    if (hasNumbersInterspersed) score -= 10;
    if (isLong) score -= 5 * Math.floor((pass.length - 12) / 4);
    
    return Math.max(0, score);
  };

  // Calculate vulnerability scores
  const calculateVulnerabilityScores = (pass: string, entropyBits: number) => {
    if (!pass) return { dictionary: 0, bruteForce: 0 };
    
    // Dictionary attack vulnerability (0-100, higher = more vulnerable)
    const dictionaryScore = 100 - Math.min(100, entropyBits);
    
    // Brute force vulnerability (0-100, higher = more vulnerable)
    const bruteForceScore = 100 - Math.min(100, entropyBits / 1.28);
    
    return { 
      dictionary: Math.max(0, dictionaryScore), 
      bruteForce: Math.max(0, bruteForceScore) 
    };
  };

  // Check compliance with security standards
  const checkStandardsCompliance = (pass: string) => {
    // PCI DSS requirements (simplified)
    const pciCompliant = 
      pass.length >= 8 && 
      /[A-Z]/.test(pass) && 
      /[a-z]/.test(pass) && 
      /[0-9]/.test(pass) && 
      /[^a-zA-Z0-9]/.test(pass);
    
    // HIPAA requirements (simplified)
    const hipaaCompliant = pass.length >= 8 && calculateCharacterClassDiversity(pass) >= 75;
    
    return { pci: pciCompliant, hipaa: hipaaCompliant };
  };

  // Identify potential attack vectors
  const identifyAttackVectors = (pass: string, entropyBits: number) => {
    const vectors = [];
    
    if (entropyBits < 50) vectors.push('Brute force');
    if (/^[a-zA-Z]+$/.test(pass)) vectors.push('Dictionary');
    if (/(.)\1{2,}/.test(pass)) vectors.push('Pattern analysis');
    if (/(?:123|abc|qwe)/.test(pass.toLowerCase())) vectors.push('Common sequence');
    
    return vectors.length ? vectors : ['None identified'];
  };

  // Calculate similar character score (lower = more similar characters)
  const calculateSimilarCharScore = (pass: string) => {
    if (!pass) return 0;
    
    const similarPairs = [
      ['1', 'l', 'I'],
      ['0', 'O'],
      ['S', '5'],
      ['Z', '2'],
      ['G', '6'],
      ['B', '8'],
    ];
    
    let similarCount = 0;
    
    for (const pair of similarPairs) {
      const regex = new RegExp(`[${pair.join('')}]`, 'g');
      const matches = pass.match(regex);
      if (matches && matches.length > 1) similarCount += matches.length;
    }
    
    return Math.max(0, 100 - (similarCount * 20));
  };

  useEffect(() => {
    if (!password) return;

    // Calculate all stats when password changes
    const entropyBits = calculateEntropy(password);
    const shannonEntropyValue = calculateShannonEntropy(password);
    const charDist = calculateCharDistribution(password);
    const uniqueScore = calculateUniquenessScore(password);
    const classDiversity = calculateCharacterClassDiversity(password);
    const memScore = calculateMemorabilityScore(password);
    const vulnScores = calculateVulnerabilityScores(password, entropyBits);
    const standards = checkStandardsCompliance(password);
    const vectors = identifyAttackVectors(password, entropyBits);
    const similarScore = calculateSimilarCharScore(password);
    const nistComp = checkNistCompliance(password);
    
    // Update all state values
    setEntropy(Math.round(entropyBits));
    setShannonEntropy(parseFloat(shannonEntropyValue.toFixed(2)));
    setStrength(determineStrength(entropyBits));
    setCrackTime(calculateCrackTime(entropyBits));
    setCharDistribution(charDist);
    setUniquenessScore(uniqueScore);
    setCharacterClassDiversity(classDiversity);
    setMemorabilityScore(memScore);
    setVulnerabilityScore(vulnScores);
    setStandardsCompliance(standards);
    setAttackVectors(vectors);
    setSimilarCharScore(similarScore);
    setNistCompliant(nistComp);
  }, [password]);

  // Helper function to determine colors based on strength
  const getStrengthColor = () => {
    switch(strength) {
      case 'weak': return 'bg-red-500';
      case 'moderate': return 'bg-orange-500';
      case 'strong': return 'bg-blue-500';
      case 'very-strong': return 'bg-green-500';
      default: return 'bg-red-500';
    }
  };

  const getStrengthTextColor = () => {
    switch(strength) {
      case 'weak': return 'text-red-500';
      case 'moderate': return 'text-orange-500';
      case 'strong': return 'text-blue-500';
      case 'very-strong': return 'text-green-500';
      default: return 'text-red-500';
    }
  };

  const getStrengthWidth = () => {
    switch(strength) {
      case 'weak': return 'w-1/4';
      case 'moderate': return 'w-1/2';
      case 'strong': return 'w-3/4';
      case 'very-strong': return 'w-full';
      default: return 'w-1/4';
    }
  };

  // Helper to render a score bar
  const renderScoreBar = (score: number, reversed = false) => {
    const width = `w-[${score}%]`;
    
    // For some metrics, a lower score is better, so we reverse the color logic
    const color = reversed 
      ? (score < 30 ? 'bg-green-500' : score < 70 ? 'bg-orange-500' : 'bg-red-500')
      : (score < 30 ? 'bg-red-500' : score < 70 ? 'bg-orange-500' : 'bg-green-500');
    
    return (
      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
        <div className={`absolute h-full ${width} ${color} transition-all duration-300`} style={{ width: `${score}%` }}></div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-sm border border-gray-300 dark:border-gray-700">
      <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">Password Statistics</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Primary Stats Section */}
        <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Strength:</span>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-20 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                <div className={`absolute h-full ${getStrengthWidth()} ${getStrengthColor()} transition-all duration-300`}></div>
              </div>
              <span className={`text-xs font-medium capitalize ${getStrengthTextColor()}`}>
                {strength.replace('-', ' ')}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Entropy:</span>
            <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">{entropy} bits</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Time to crack:</span>
            <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">{crackTime}</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Character types:</span>
            <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
              {[/[a-z]/.test(password) ? 'lowercase' : '',
                /[A-Z]/.test(password) ? 'uppercase' : '',
                /[0-9]/.test(password) ? 'numbers' : '',
                /[^a-zA-Z0-9]/.test(password) ? 'symbols' : '']
                .filter(Boolean)
                .join(', ') || 'none'}
            </span>
          </div>
        </div>
        
        {/* Advanced Stats */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Shannon Entropy:</span>
            <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">{shannonEntropy} bits/symbol</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Uniqueness Score:</span>
            <div className="flex items-center gap-3">
              {renderScoreBar(uniquenessScore)}
              <span className="text-xs font-medium">{uniquenessScore}%</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Character Class Diversity:</span>
            <div className="flex items-center gap-3">
              {renderScoreBar(characterClassDiversity)}
              <span className="text-xs font-medium">{characterClassDiversity}%</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Similar Character Score:</span>
            <div className="flex items-center gap-3">
              {renderScoreBar(similarCharScore)}
              <span className="text-xs font-medium">{similarCharScore}%</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Memorability:</span>
            <div className="flex items-center gap-3">
              {renderScoreBar(memorabilityScore)}
              <span className="text-xs font-medium">{memorabilityScore}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Character Distribution:</span>
            <div className="grid grid-cols-4 gap-1 text-xs">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400">a-z</span>
                <span className="text-gray-900 dark:text-gray-100">{charDistribution.lowercase}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400">A-Z</span>
                <span className="text-gray-900 dark:text-gray-100">{charDistribution.uppercase}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400">0-9</span>
                <span className="text-gray-900 dark:text-gray-100">{charDistribution.numbers}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400">!@#</span>
                <span className="text-gray-900 dark:text-gray-100">{charDistribution.symbols}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Vulnerability to Attacks:</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Dictionary</span>
                {renderScoreBar(vulnerabilityScore.dictionary, true)}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Brute Force</span>
                {renderScoreBar(vulnerabilityScore.bruteForce, true)}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Compliance:</span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${nistCompliant ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>NIST</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${standardsCompliance.pci ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>PCI DSS</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${standardsCompliance.hipaa ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>HIPAA</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Potential Attack Vectors:</span>
            <div className="flex flex-wrap gap-1">
              {attackVectors.map((vector, index) => (
                <span 
                  key={index} 
                  className={`text-xs px-2 py-0.5 rounded ${vector === 'None identified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                >
                  {vector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStats; 