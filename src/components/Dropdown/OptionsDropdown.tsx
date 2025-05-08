import { useId, useRef } from "react";
import Button from "../Button/Button";

export interface IOptionsDropdownProps {
  title: string;
  values: string[];
  className: string;
  passwordOptions: {
    params: Array<{ id: number; value: string; isChecked: boolean }>;
  };
  setPasswordOptions: React.Dispatch<
    React.SetStateAction<{
      params: Array<{ id: number; value: string; isChecked: boolean }>;
    }>
  >;
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

// Options icon
const optionsIcon = (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    fill="#FFFFFF" 
    className="mr-2" 
    viewBox="0 0 16 16"
  >
    <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434L7.068.727z"/>
    <path d="M8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
  </svg>
);

/**
 * A dropdown component that allows users to select password options.
 *
 * @param {IOptionsDropdownProps} props - The properties for the OptionsDropdown component.
 * @param {string} props.title - The title of the dropdown button.
 * @param {string[]} props.values - The possible values for the password options.
 * @param {string} props.className - The additional class names for styling the button.
 * @param {{params: Array<{id: number; value: string; isChecked: boolean}>}} props.passwordOptions - The current state of the selected password options.
 * @param {React.Dispatch<React.SetStateAction<{{params: Array<{id: number; value: string; isChecked: boolean}>}}>>} props.setPasswordOptions - The setter function to update the selected password options.
 *
 * @returns {JSX.Element} The rendered OptionsDropdown component.
 */
const OptionsDropdown = (props: IOptionsDropdownProps): JSX.Element => {
  // Generate unique IDs for this dropdown instance
  const uniqueId = useId();
  const dropdownId = `optionDropdown_${uniqueId}`;
  const buttonId = `optionButton_${uniqueId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Handles the change event when a user clicks on one of the password option checkboxes.
   * Updates the state of the selected password options.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event for the input element.
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const id = parseInt(event.target.id.split('_')[0]);
    // Create a new params array with the updated checked value
    const updatedParams = props.passwordOptions.params.map((param, index) =>
      index === id ? { ...param, isChecked: event.target.checked } : param
    );
    
    // Update the state with a new object
    props.setPasswordOptions({
      params: updatedParams
    });
  }

  // Create combined SVG with options icon and dropdown arrow
  const combinedSvg = (
    <>
      {optionsIcon}
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
        className="z-40 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 absolute left-0 mt-1"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={buttonId}
        >
          {props.values.map((value: string, index: number) => {
            const checkboxId = `${index}_option_${uniqueId}`;
            return (
              <li key={index} className="cursor-pointer">
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    checked={props.passwordOptions.params[index].isChecked}
                    id={checkboxId}
                    value={value}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={checkboxId}
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

export default OptionsDropdown;
