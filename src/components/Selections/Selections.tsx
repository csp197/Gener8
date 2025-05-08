import { useRef, useState } from "react";

import Button from "../Button/Button";
import TypeDropdown from "../Dropdown/TypesDropdown";
import OptionsDropdown from "../Dropdown/OptionsDropdown";
import generatePassword from "../../core/generatePassword";

interface IOptionsProps {
  dropdownTitles: string[];
  dropdownValues: string[][];
  dropdownClasses: string[];
  passwordState: string;
  passwordSetter: React.Dispatch<React.SetStateAction<string>>;
  passwordType: string;
  passwordLength: number;
  passwordOptions: {
    params: {
      id: number;
      value: string;
      isChecked: boolean;
    }[];
  };
  passwordTypeSetter: React.Dispatch<React.SetStateAction<string>>;
  passwordOptionsSetter: React.Dispatch<
    React.SetStateAction<{
      params: {
        id: number;
        value: string;
        isChecked: boolean;
      }[];
    }>
  >;
  addToHistory?: (password: string, length: number, type: string) => void;
}

const copySvg = (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="12.000000pt"
    height="12.000000pt"
    viewBox="0 0 48.000000 48.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
      fill="#FFFFFF"
      stroke="none"
    >
      <path
        d="M147 412 c-14 -15 -17 -42 -17 -149 0 -165 -2 -163 137 -163 135 0
   133 -2 133 167 0 165 2 163 -137 163 -84 0 -103 -3 -116 -18z m218 -147 l0
   -130 -100 0 -100 0 -3 119 c-1 66 0 126 2 133 4 11 29 13 103 11 l98 -3 0
   -130z"
      />
      <path
        d="M92 367 c-10 -12 -13 -48 -10 -141 4 -165 8 -170 146 -174 80 -3 100
   -1 111 12 12 14 4 16 -86 16 -140 0 -137 -4 -143 166 -4 116 -7 135 -18 121z"
      />
    </g>
  </svg>
);

/**
 * A component that provides controls for selecting password type and options,
 * as well as buttons for generating and copying the password.
 *
 * @param {string[]} dropdownTitles - Titles for the dropdown components.
 * @param {string[][]} dropdownValues - Values for the dropdown options.
 * @param {string[]} dropdownClasses - Additional class names for styling the dropdowns.
 * @param {string} passwordState - The current state of the generated password.
 * @param {React.Dispatch<React.SetStateAction<string>>} passwordSetter - Setter function to update the password state.
 * @param {string} passwordType - The current type of the password.
 * @param {Object} passwordOptions - Options object containing parameters for password generation.
 * @param {number} passwordLength - The length of the password to be generated.
 * @param {React.Dispatch<React.SetStateAction<string>>} passwordTypeSetter - Setter function to update the password type.
 * @param {React.Dispatch<React.SetStateAction<{params: {id: number; value: string; isChecked: boolean;}[];}>>} passwordOptionsSetter - Setter function to update the password options.
 * @param {Function} addToHistory - Optional function to add the generated password to history.
 *
 * @returns {JSX.Element} The rendered Selections component.
 */
const Selections = ({
  dropdownTitles,
  dropdownValues,
  dropdownClasses,
  passwordState,
  passwordSetter,
  passwordType,
  passwordOptions,
  passwordLength,
  passwordTypeSetter,
  passwordOptionsSetter,
  addToHistory,
}: IOptionsProps) => {
  const refreshSvgRef = useRef<SVGSVGElement>(null);

  const generateSvg = (
    <svg
      className="animate-none"
      ref={refreshSvgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16px"
      height="16px"
    >
      <g fill="#FFFFFF">
        <path d="M10.5 2.5L10.5 7.5L8.5 7.5L12 11L15.5 7.5L13.5 7.5L13.5 2.5L10.5 2.5zM5.5 13L2 16.5L4 16.5L4 21.5L7 21.5L7 16.5L9 16.5L5.5 13zM15 16.5L15 21.5L18 21.5L18 16.5L20 16.5L16.5 13L13 16.5L15 16.5z" />
      </g>
    </svg>
  );

  const [copyButtonName, setCopyButtonName] = useState("Copy");

  const handleClick = async () => {
    try {
      const password = generatePassword(
        passwordType,
        passwordOptions,
        passwordLength
      );
      passwordSetter(password);
      
      // Add to history if the function is provided
      if (addToHistory) {
        addToHistory(password.slice(0, passwordLength), passwordLength, passwordType);
      }
    } catch (error) {
      console.error("Error generating password:", error);
    }
    const svg = refreshSvgRef.current;
    if (svg) {
      svg.classList.remove("animate-none");
      svg.classList.add("animate-spin");
      setTimeout(() => {
        svg.classList.remove("animate-spin");
        svg.classList.add("animate-none");
      }, 2000);
    }
  };

  // Function to copy the password to clipboard
  const handleCopy = async () => {
    try {
      // Get the truncated password according to the password length
      const textToCopy = passwordState.slice(0, passwordLength);
      
      // Use the Clipboard API to copy text
      await navigator.clipboard.writeText(textToCopy);
      
      // Update button text to show feedback
      setCopyButtonName("Copied!");
      
      // Reset button text after 2 seconds
      setTimeout(() => setCopyButtonName("Copy"), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyButtonName("Failed to copy");
      setTimeout(() => setCopyButtonName("Copy"), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
      <div className="relative z-30 flex justify-center items-center">
        <TypeDropdown
          title={dropdownTitles[0]}
          values={dropdownValues[0]}
          className={`${dropdownClasses[0]} btn-outline btn-success`}
          passwordType={passwordType}
          setPasswordType={passwordTypeSetter}
        />
      </div>
      <div className="relative z-20 flex justify-center items-center">
        <OptionsDropdown
          title={dropdownTitles[1]}
          values={dropdownValues[1]}
          className={`${dropdownClasses[1]} btn-outline btn-orange`}
          passwordOptions={passwordOptions}
          setPasswordOptions={passwordOptionsSetter}
        />
      </div>
      <div className="flex justify-center items-center">
        <Button
          value="Generate"
          className="btn btn-outline btn-accent w-full"
          svgCode={generateSvg}
          clickFunc={handleClick}
        />
      </div>
      <div className="flex justify-center items-center">
        <Button
          value={copyButtonName}
          className="btn btn-outline btn-pink w-full"
          svgCode={copySvg}
          clickFunc={handleCopy}
        />
      </div>
    </div>
  );
};

export default Selections;
