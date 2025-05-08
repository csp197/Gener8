import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import PasswordField from "./components/PasswordField/PasswordField";
import Selections from "./components/Selections/Selections";
import RangeSlider from "./components/RangeSlider/RangeSlider";
import generatePassword from "./core/generatePassword";
import Button from "./components/Button/Button";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import initializeInteractiveElements from "./utils/dropdown";
import PasswordStats from "./components/PasswordStats/PasswordStats";
import PasswordHistory from "./components/PasswordHistory/PasswordHistory";
import PasswordMnemonic from "./components/PasswordMnemonic/PasswordMnemonic";
import PasswordBreachCheck from "./components/PasswordBreachCheck/PasswordBreachCheck";
import usePasswordHistory from "./hooks/usePasswordHistory";

/**
 * Main application component that renders the password generator interface.
 * It includes components for displaying and setting the password, selecting
 * password types and options, and adjusting the password length.
 *
 * Uses:
 * - `Header`: Displays the application header.
 * - `PasswordField`: Shows the generated password and allows for updates.
 * - `Selections`: Allows users to select password type and options.
 * - `RangeSlider`: Adjusts the password length within a defined range.
 *
 * State variables:
 * - `passwordLength`: Number, represents the length of the password.
 * - `passwordType`: String, type of password (e.g., Alphanumeric, Alphabetical, etc.).
 * - `passwordOptions`: Object, contains boolean values indicating selected password options.
 * - `password`: String, the generated password based on the selected options.
 */
function App() {
  const MIN_PASS_SIZE = 3;
  const MAX_PASS_SIZE = 150;

  // Check for preferred color scheme
  useEffect(() => {
    // Check for a saved theme preference in localStorage, otherwise use system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const initialTheme = prefersDark ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", initialTheme);
      document.documentElement.classList.toggle("dark", initialTheme === "dark");
      localStorage.setItem("theme", initialTheme);
    }
  }, []);

  // Initialize dropdown functionality
  useEffect(() => {
    // Initialize the dropdown functionality when the component mounts
    initializeInteractiveElements();
    
    // Reinitialize on window resize to handle edge cases
    const handleResize = () => {
      initializeInteractiveElements();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [passwordLength, setPasswordLength] = useState(20);
  const [passwordType, setPasswordType] = useState("Alphanumeric");
  const [passwordOptions, setPasswordOptions] = useState({
    params: [
      { id: 0, value: "Uppercase", isChecked: false },
      { id: 1, value: "Lowercase", isChecked: true },
      { id: 2, value: "Numbers", isChecked: true },
      { id: 3, value: "Symbols", isChecked: false },
    ],
  });

  const [password, setPassword] = useState(
    generatePassword(passwordType, passwordOptions, passwordLength)
  );

  // Password history management
  const { history, addToHistory, clearHistory } = usePasswordHistory();

  // Add initial password to history on first render
  useEffect(() => {
    // Only add if history is empty to avoid duplicates on re-renders
    if (history.length === 0) {
      addToHistory(
        password.slice(0, passwordLength),
        passwordLength,
        passwordType
      );
    }
  }, []);

  const handleCreatePassword = () => {
    const newPassword = generatePassword(passwordType, passwordOptions, passwordLength);
    setPassword(newPassword);
    
    // Add to history when a new password is generated
    addToHistory(
      newPassword.slice(0, passwordLength), 
      passwordLength, 
      passwordType
    );
  };

  // Called when a password is selected from history
  const handleSelectPassword = (selectedPassword: string) => {
    setPassword(selectedPassword);
  };

  const createPasswordSvg = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16px" 
      height="16px" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M20 11H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z" />
      <path d="M8 11V7c0-2.2 1.8-4 4-4s4 1.8 4 4v4" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  );

  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Theme toggle in top right */}
        <div className="flex justify-end mb-2">
          <ThemeToggle />
        </div>
        
        {/* Header centered */}
        <div className="flex justify-center mb-6">
          <Header />
        </div>
        
        {/* Password field */}
        <PasswordField 
          passwordState={password} 
          passwordLength={passwordLength}
          passwordSetter={setPassword}
          passwordType={passwordType}
          passwordOptions={passwordOptions}
        />
        
        {/* Password selection controls */}
        <Selections
          dropdownTitles={["Type", "Options"]}
          dropdownValues={[
            ["Alphabetical", "Alphanumeric", "Numerical", "Pronounceable"],
            ["Uppercase", "Lowercase", "Numbers", "Symbols"],
          ]}
          dropdownClasses={["", ""]}
          passwordState={password}
          passwordSetter={setPassword}
          passwordType={passwordType}
          passwordOptions={passwordOptions}
          passwordLength={passwordLength}
          passwordTypeSetter={setPasswordType}
          passwordOptionsSetter={setPasswordOptions}
          addToHistory={addToHistory}
        />
        
        {/* Password length slider */}
        <RangeSlider
          min={MIN_PASS_SIZE}
          max={MAX_PASS_SIZE}
          passwordLength={passwordLength}
          passwordLengthSetter={setPasswordLength}
        />
        
        {/* Password statistics */}
        <PasswordStats 
          password={password.slice(0, passwordLength)} 
          passwordType={passwordType}
          passwordOptions={passwordOptions}
        />

        {/* Password breach check */}
        <PasswordBreachCheck password={password.slice(0, passwordLength)} />
        
        {/* Password memory aid */}
        <PasswordMnemonic password={password.slice(0, passwordLength)} />
        
        {/* Password history */}
        <PasswordHistory 
          history={history} 
          onClearHistory={clearHistory}
          onSelectPassword={handleSelectPassword}
        />
      </div>
    </div>
  );
}

export default App;
// CHECK <React.StrictMode> ! in main.tsx
