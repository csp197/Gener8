import { useId, useRef, useEffect } from "react";
import Button from "../Button/Button";

export interface ITypeDropdownProps {
  title: string;
  values: string[];
  className: string;
  passwordType: string;
  setPasswordType: React.Dispatch<React.SetStateAction<string>>;
}

// Arrow icon for dropdown
const dropDownArrowSvgCode = (
  <svg
    className="w-2.5 h-2.5 ml-2.5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFFFFF"
    viewBox="0 0 10 6"
  >
    {/* <g fill="#FFFFFF" stroke="none"> */}
    <path
      // stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 1 4 4 4-4"
    />
    {/* </g> */}
  </svg>
);

// Password Type icon
const passwordTypeIcon = (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    fill="#FFFFFF" 
    className="mr-2" 
    viewBox="0 0 16 16"
  >
    <path d="M11.5 8h-7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
    <path d="M3.5 6.5A3.5 3.5 0 0 1 7 3h2a3.5 3.5 0 0 1 3.5 3.5v.5h-1v-.5a2.5 2.5 0 0 0-2.5-2.5H7a2.5 2.5 0 0 0-2.5 2.5v.5h-1z"/>
  </svg>
);

/**
 * A dropdown component that allows users to select a password type.
 *
 * @param {ITypeDropdownProps} props - The properties for the TypeDropdown component.
 * @param {string} props.title - The title of the dropdown button.
 * @param {string[]} props.values - The possible values for the password type.
 * @param {string} props.className - The additional class names for styling the button.
 * @param {string} props.passwordTypeState - The current state of the selected password type.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.passwordTypeSetter - The setter function to update the selected password type.
 *
 * @returns {JSX.Element} The rendered TypeDropdown component.
 */
const TypeDropdown = (props: ITypeDropdownProps) => {
  // Generate unique IDs for this dropdown instance
  const uniqueId = useId();
  const dropdownId = `typeDropdown_${uniqueId}`;
  const buttonId = `typeButton_${uniqueId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  // Create combined SVG with type icon and dropdown arrow
  const combinedSvg = (
    <>
      {passwordTypeIcon}
      {props.title}
      {dropDownArrowSvgCode}
    </>
  );

  return (
    <div ref={containerRef} className="inline-block w-full">
      {/* Use data-dropdown-toggle attribute for Flowbite dropdown functionality */}
      <Button
        value=""
        className={`btn flex items-center w-full ${props.className}`}
        svgCode={combinedSvg}
        id={buttonId}
        dropdownToggle={dropdownId}
        dropdownTrigger="click"
      />
      {/* The dropdown menu needs to be an immediate sibling of the button */}
      <div
        id={dropdownId}
        className="z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 absolute left-0 mt-1"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={buttonId}
        >
          {props.values.map((value: string, index: number) => {
            const radioId = `type_${value}_${uniqueId}`;
            return (
              <li key={index} className="cursor-pointer">
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={radioId}
                    type="radio"
                    value={value}
                    checked={props.passwordType === value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      props.setPasswordType(event.target.value);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={radioId}
                    className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {value}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TypeDropdown;
