import { useState, useEffect } from 'react';
import { PasswordHistoryItem } from '../components/PasswordHistory/PasswordHistory';

/**
 * Custom hook to manage password history
 * Handles storing history in session storage and provides methods to add/clear history
 */
export const usePasswordHistory = () => {
  // Get history from session storage or initialize empty array
  const getInitialHistory = (): PasswordHistoryItem[] => {
    const savedHistory = sessionStorage.getItem('passwordHistory');
    if (savedHistory) {
      try {
        // Convert string dates back to Date objects
        const parsedHistory = JSON.parse(savedHistory);
        return parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      } catch (e) {
        console.error('Error parsing password history', e);
        return [];
      }
    }
    return [];
  };
  
  const [history, setHistory] = useState<PasswordHistoryItem[]>(getInitialHistory);
  
  // Update session storage when history changes
  useEffect(() => {
    sessionStorage.setItem('passwordHistory', JSON.stringify(history));
  }, [history]);
  
  // Add a new password to history
  const addToHistory = (
    password: string, 
    length: number, 
    type: string
  ) => {
    // Generate unique ID based on timestamp
    const id = `pwd_${Date.now()}`;
    const timestamp = new Date();
    
    // Add new password to the beginning of history
    const newHistory = [
      { id, password, timestamp, length, type },
      ...history
    ];
    
    // Limit history to 20 items
    if (newHistory.length > 20) {
      newHistory.pop();
    }
    
    setHistory(newHistory);
  };
  
  // Clear all history
  const clearHistory = () => {
    setHistory([]);
    sessionStorage.removeItem('passwordHistory');
  };
  
  return {
    history,
    addToHistory,
    clearHistory
  };
};

export default usePasswordHistory; 