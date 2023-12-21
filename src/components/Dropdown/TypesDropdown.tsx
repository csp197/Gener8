import Button from "../Button/Button";

interface ITypeDropdownProps {
  title: string;
  values: string[];
  className: string;
  passwordTypeState: string;
  passwordTypeSetter: React.Dispatch<React.SetStateAction<string>>;
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

const TypeDropdown = (props: ITypeDropdownProps) => {
  return (
    <div>
      <Button
        value={props.title}
        className={"btn btn-outline " + props.className}
        svgCode={dropDownArrowSvgCode}
        id={"typeDropdownHoverButton"}
        dropdownToggle={"typeDropdownHover"}
        dropdownTrigger="hover"
      />
      <div
        id={"typeDropdownHover"}
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={"typeDropdownHoverButton"}
        >
          {props.values.map((value: string, index: number) => {
            return (
              <li key={index}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={index.toString()}
                    type="radio"
                    value={value}
                    checked={props.passwordTypeState === value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      props.passwordTypeSetter(event.target.value);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={index.toString()}
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
