import { useId } from "react";
import Button from "../Button/Button";
import "./Dropdown.css";

export interface ITypeDropdownProps {
  title: string;
  values: string[];
  className: string;
  passwordType: string;
  setPasswordType: React.Dispatch<React.SetStateAction<string>>;
}

// TODO: place in separate file in utils dir
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
            const radioId = `type_${value}_${uniqueId}`;
            return (
              <li key={index}>
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
