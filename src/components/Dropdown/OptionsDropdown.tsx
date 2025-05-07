import { useId } from "react";
import Button from "../Button/Button";
import "./Dropdown.css";

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

  return (
    <div className="dropdown-container">
      <Button
        value={props.title}
        className={"btn btn-outline " + props.className}
        svgCode={dropDownArrowSvgCode}
        id={buttonId}
        dropdownToggle={dropdownId}
        dropdownTrigger="click"
      />
      <div
        id={dropdownId}
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={buttonId}
        >
          {props.values.map((value: string, index: number) => {
            const checkboxId = `${index}_option_${uniqueId}`;
            return (
              <li key={index}>
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
