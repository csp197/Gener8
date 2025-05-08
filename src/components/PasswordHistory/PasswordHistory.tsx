import { useState } from 'react';

export interface PasswordHistoryItem {
  id: string;
  password: string;
  timestamp: Date;
  length: number;
  type: string;
}

interface PasswordHistoryProps {
  history: PasswordHistoryItem[];
  onClearHistory: () => void;
  onSelectPassword: (password: string) => void;
}

/**
 * Component that displays a history of previously generated passwords
 */
const PasswordHistory = ({ history, onClearHistory, onSelectPassword }: PasswordHistoryProps) => {
  // State for copied password notification
  const [copiedId, setCopiedId] = useState<string | null>(null);
  // State to track which passwords are visible
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  
  // Copy password to clipboard
  const copyPassword = (id: string, password: string) => {
    navigator.clipboard.writeText(password);
    // Show "Copied" status briefly
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Toggle password visibility for a specific row
  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Obscure a password with dots, showing only the first and last character
  const obscurePassword = (password: string) => {
    if (password.length <= 2) return password;
    return password[0] + '•'.repeat(password.length - 2) + password[password.length - 1];
  };

  // Format timestamp to a readable string
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // If there's no history, show a message
  if (history.length === 0) {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-6">
        <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Password History</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your generated passwords will appear here during this session.
        </p>
      </div>
    );
  }
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Password History</h3>
        <button 
          onClick={onClearHistory}
          className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Clear All
        </button>
      </div>
      
      <div className="overflow-auto max-h-48">
        <table className="w-full text-xs">
          <thead className="text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="text-left pb-2 font-medium">Password</th>
              <th className="text-left pb-2 font-medium">Type</th>
              <th className="text-left pb-2 font-medium">Length</th>
              <th className="text-left pb-2 font-medium">Time</th>
              <th className="text-right pb-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="py-2">
                  <div className="flex items-center space-x-1">
                    <div 
                      className="font-typewriter overflow-x-auto scrollbar-thin max-w-[120px] whitespace-nowrap pr-2"
                      title={item.password}
                    >
                      {visiblePasswords[item.id] ? item.password : obscurePassword(item.password)}
                    </div>
                    <button
                      onClick={() => togglePasswordVisibility(item.id)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                      title={visiblePasswords[item.id] ? "Hide password" : "Show password"}
                    >
                      {visiblePasswords[item.id] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-2">{item.type}</td>
                <td className="py-2">{item.length}</td>
                <td className="py-2">{formatTime(item.timestamp)}</td>
                <td className="py-2 text-right whitespace-nowrap">
                  <button
                    onClick={() => copyPassword(item.id, item.password)}
                    className={`px-2 ${
                      copiedId === item.id 
                        ? 'text-green-500 dark:text-green-400' 
                        : 'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                    }`}
                    title="Copy password"
                  >
                    {copiedId === item.id ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={() => onSelectPassword(item.password)}
                    className="px-2 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    title="Use this password"
                  >
                    Use
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Password history is stored only in this browser session and will be cleared when you close the tab.
      </p>
    </div>
  );
};

export default PasswordHistory; 