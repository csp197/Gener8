import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the mnemonic generator to control its output - do this before importing the component
vi.mock('../../utils/mnemonic-generator', () => ({
  generateMnemonic: vi.fn((password) => {
    if (!password) return 'Please generate a password first.';
    return `Mnemonic for "${password}"`;
  }),
  generateAcrosticMnemonic: vi.fn((password) => {
    if (!password) return 'Please generate a password first.';
    return `Acrostic for "${password}"`;
  })
}));

// Import the component after mocking its dependencies
import PasswordMnemonic from './PasswordMnemonic';
// Import the mocked functions to control them in tests
import { generateMnemonic, generateAcrosticMnemonic } from '../../utils/mnemonic-generator';

describe('PasswordMnemonic Component', () => {
  it('should render a message when no password is provided', () => {
    render(<PasswordMnemonic password="" />);
    
    expect(screen.getByText('Please generate a password first.')).toBeInTheDocument();
  });
  
  it('should display a mnemonic for a password', () => {
    render(<PasswordMnemonic password="test123" />);
    
    // Default is mnemonic tab
    expect(screen.getByText('Mnemonic for "test123"')).toBeInTheDocument();
  });
  
  it('should switch between mnemonic types when tabs are clicked', () => {
    render(<PasswordMnemonic password="test123" />);
    
    // Default shows mnemonic
    expect(screen.getByText('Mnemonic for "test123"')).toBeInTheDocument();
    
    // Click on Acrostic tab
    fireEvent.click(screen.getByText('Acrostic'));
    
    // Should now show acrostic
    expect(screen.getByText('Acrostic for "test123"')).toBeInTheDocument();
    
    // Click back to Sentence tab
    fireEvent.click(screen.getByText('Sentence'));
    
    // Should show mnemonic again
    expect(screen.getByText('Mnemonic for "test123"')).toBeInTheDocument();
  });
  
  it('should generate a new mnemonic when the button is clicked', () => {
    // Reset mock counter to have predictable count
    vi.clearAllMocks();
    
    render(<PasswordMnemonic password="test123" />);
    
    // Click generate new aid button
    fireEvent.click(screen.getByText('Generate New Aid'));
    
    // Check if the function was called again
    expect(generateMnemonic).toHaveBeenCalledTimes(2); // Once on mount, once on click
    expect(generateMnemonic).toHaveBeenCalledWith('test123');
  });
  
  it('should generate a new acrostic when the button is clicked in acrostic mode', () => {
    // Reset mock counter
    vi.clearAllMocks();
    
    render(<PasswordMnemonic password="test123" />);
    
    // Switch to acrostic tab
    fireEvent.click(screen.getByText('Acrostic'));
    
    // Click generate new aid button
    fireEvent.click(screen.getByText('Generate New Aid'));
    
    // Check if the function was called again
    expect(generateAcrosticMnemonic).toHaveBeenCalledTimes(2); // Once on mount, once on click
    expect(generateAcrosticMnemonic).toHaveBeenCalledWith('test123');
  });
  
  it('should update mnemonic when password changes', () => {
    const { rerender } = render(<PasswordMnemonic password="test123" />);
    
    expect(screen.getByText('Mnemonic for "test123"')).toBeInTheDocument();
    
    // Change the password prop
    rerender(<PasswordMnemonic password="newpassword" />);
    
    // Should update the displayed mnemonic
    expect(screen.getByText('Mnemonic for "newpassword"')).toBeInTheDocument();
  });
}); 