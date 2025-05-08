import { describe, it, expect } from 'vitest';
import { generateMnemonic, generateAcrosticMnemonic } from './mnemonic-generator';

describe('Mnemonic Generator', () => {
  describe('generateMnemonic', () => {
    it('should generate a message for empty passwords', () => {
      const result = generateMnemonic('');
      expect(result).toBe('Please generate a password first.');
    });

    it('should format short passwords as a simple list', () => {
      const password = 'abc';
      const result = generateMnemonic(password);
      
      // Should format as "a as in apple, b as in banana, c as in cat"
      expect(result).toContain('a as in');
      expect(result).toContain('b as in');
      expect(result).toContain('c as in');
      expect(result.split(',').length).toBe(3);
    });

    it('should generate a sentence for longer passwords', () => {
      const password = 'password123';
      const result = generateMnemonic(password);
      
      // Should start with a capital letter
      expect(/^[A-Z]/.test(result)).toBe(true);
      
      // Should end with a period
      expect(result.endsWith('.')).toBe(true);
      
      // Should contain words for each character
      expect(result.split(' ').length).toBeGreaterThanOrEqual(password.length);
    });

    it('should add transition words for longer passwords', () => {
      const password = 'longpassword';
      const result = generateMnemonic(password);
      
      // With transition words, we should have more words than characters
      const wordCount = result.split(' ').length;
      expect(wordCount).toBeGreaterThan(password.length);
    });
  });

  describe('generateAcrosticMnemonic', () => {
    it('should generate a message for empty passwords', () => {
      const result = generateAcrosticMnemonic('');
      expect(result).toBe('Please generate a password first.');
    });

    it('should create a sentence where first letters spell the password', () => {
      const password = 'test';
      const result = generateAcrosticMnemonic(password);
      
      const words = result.replace('.', '').split(' ');
      
      // Each word should start with the corresponding letter from the password
      expect(words[0].toLowerCase().charAt(0)).toBe('t');
      expect(words[1].toLowerCase().charAt(0)).toBe('e');
      expect(words[2].toLowerCase().charAt(0)).toBe('s');
      expect(words[3].toLowerCase().charAt(0)).toBe('t');
    });

    it('should handle special characters in the password', () => {
      const password = 'test!';
      const result = generateAcrosticMnemonic(password);
      
      // Special characters should be handled with appropriate notation
      expect(result).toContain('(!)');
    });
  });
}); 