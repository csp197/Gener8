import { useState, useEffect } from 'react';
import { generateMnemonic, generateAcrosticMnemonic } from '../../utils/mnemonic-generator';

interface PasswordMnemonicProps {
  password: string;
}

/**
 * Component that displays mnemonic phrases to help remember passwords
 */
const PasswordMnemonic = ({ password }: PasswordMnemonicProps) => {
  const [mnemonic, setMnemonic] = useState('');
  const [acrostic, setAcrostic] = useState('');
  const [activeTab, setActiveTab] = useState<'mnemonic' | 'acrostic'>('mnemonic');
  
  // Generate new mnemonics when the password changes
  useEffect(() => {
    if (password) {
      setMnemonic(generateMnemonic(password));
      setAcrostic(generateAcrosticMnemonic(password));
    } else {
      setMnemonic('Please generate a password first.');
      setAcrostic('Please generate a password first.');
    }
  }, [password]);
  
  // Regenerate current mnemonic
  const regenerateMnemonic = () => {
    if (password) {
      if (activeTab === 'mnemonic') {
        setMnemonic(generateMnemonic(password));
      } else {
        setAcrostic(generateAcrosticMnemonic(password));
      }
    }
  };
  
  // Switch between mnemonic types
  const handleTabChange = (tab: 'mnemonic' | 'acrostic') => {
    setActiveTab(tab);
  };
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Memory Aid</h3>
        <div className="flex text-xs">
          <button 
            className={`px-3 py-1 rounded-l-md ${
              activeTab === 'mnemonic' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => handleTabChange('mnemonic')}
          >
            Sentence
          </button>
          <button 
            className={`px-3 py-1 rounded-r-md ${
              activeTab === 'acrostic'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => handleTabChange('acrostic')}
          >
            Acrostic
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs text-gray-700 dark:text-gray-300 mb-3">
        {activeTab === 'mnemonic' ? mnemonic : acrostic}
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {activeTab === 'mnemonic' 
            ? 'A sentence made from words starting with each character in your password.'
            : 'Words where first letters spell out your password.'}
        </p>
        <button
          onClick={regenerateMnemonic}
          className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          disabled={!password}
        >
          Generate New Aid
        </button>
      </div>
    </div>
  );
};

export default PasswordMnemonic; 