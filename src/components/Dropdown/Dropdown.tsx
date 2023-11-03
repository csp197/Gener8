import Button from "../Button/Button";

interface DropdownProps {
  title: string;
  values: string[];
  state: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
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

const Dropdown = (props: DropdownProps) => {
  return (
    <div>
      {/* <button className="btn btn-outline btn-info">Info</button> */}

      <Button
        value={props.title}
        className="btn btn-outline btn-primary"
        svgCode={dropDownArrowSvgCode}
        id="dropdownHoverButton"
        dropdownToggle="dropdownHover"
        dropdownTrigger="hover"
      />

      {/* <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="btn btn-outline btn-info"
        type="button"
      >
        {props.title}{" "}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button> */}
      {/* <!-- Dropdown menu --> */}
      <div
        id="dropdownHover"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          {props.values.map((value: string, index: number) => {
            return (
              <li key={index}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {value}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>

    // <div>
    //   <label classNameName="block mb-2 text-sm font-medium">Password Type</label>
    //   {/* Password Type:  */}
    //   <select
    //     classNameName="select select-primary w-full max-w-xs"
    //     value={props.state}
    //     onChange={(e) => {
    //       props.setter(e.target.value);
    //     }}
    //   >
    //     {/* <option disabled defaultValue={props.title}>
    //     {props.title}
    //   </option> */}
    //     {props.values.map((value: string, index: number) => {
    //       return <option key={index}>{value}</option>;
    //     })}
    //   </select>
    // </div>
  );
};

export default Dropdown;
