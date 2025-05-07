/**
 * Initialize dropdown functionality that responds to click events
 * This makes the dropdowns open when the button is clicked
 */
export function initializeDropdowns() {
  // Remove any existing event listeners
  document.removeEventListener('click', handleDocumentClick);

  // Get all dropdown buttons
  const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]');
  
  // Track open dropdowns
  let activeDropdown: HTMLElement | null = null;
  
  // Handle document clicks
  function handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isDropdownButton = target.closest('[data-dropdown-toggle]');
    const isDropdownMenu = target.closest('[id^="typeDropdown_"], [id^="optionDropdown_"]');
    
    if (!isDropdownButton && !isDropdownMenu && activeDropdown) {
      activeDropdown.classList.add('hidden');
      activeDropdown = null;
    }
  }
  
  // Add global document click handler
  document.addEventListener('click', handleDocumentClick);
  
  // Add click event listeners to each button
  dropdownButtons.forEach(button => {
    // Remove existing listeners by cloning
    const newButton = button.cloneNode(true);
    if (button.parentNode) {
      button.parentNode.replaceChild(newButton, button);
      
      // Add new event listener to the cloned button
      newButton.addEventListener('click', (event: Event) => {
        event.stopPropagation();
        
        const targetId = (newButton as HTMLElement).getAttribute('data-dropdown-toggle');
        if (!targetId) return;
        
        const dropdownElement = document.getElementById(targetId);
        if (!dropdownElement) return;
        
        // If the dropdown is already active and visible
        if (activeDropdown === dropdownElement && !dropdownElement.classList.contains('hidden')) {
          dropdownElement.classList.add('hidden');
          activeDropdown = null;
        } 
        // If clicking on a different dropdown button
        else {
          // Hide any active dropdown
          if (activeDropdown) {
            activeDropdown.classList.add('hidden');
          }
          
          // Show the new dropdown
          dropdownElement.classList.remove('hidden');
          activeDropdown = dropdownElement;
        }
      });
    }
  });
}

/**
 * Initialize all interactive elements on page load
 */
export function initializeInteractiveElements() {
  // Run initialization after a small delay to ensure DOM is loaded
  setTimeout(initializeDropdowns, 100);
  
  // Also run on window resize to handle edge cases
  window.addEventListener('resize', () => {
    setTimeout(initializeDropdowns, 100);
  });
}

// Export for direct usage
export default initializeInteractiveElements; 