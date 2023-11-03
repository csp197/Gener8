import Button from "../Button/Button";

interface DropdownProps {
  temp_idx: number;
  title: string;
  values: string[];
  className: string;
  state: string | { [key: string]: boolean };
  setter:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  type: string;

  changeFunc?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  const map: { [key: string]: boolean } = props.state;

  return (
    <div>
      {/* <button className="btn btn-outline btn-info">Info</button> */}

      <Button
        value={props.title}
        className={"btn btn-outline " + props.className}
        svgCode={dropDownArrowSvgCode}
        id={"dropdownHoverButton" + props.temp_idx.toString()}
        dropdownToggle={"dropdownHover" + props.temp_idx.toString()}
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
        id={"dropdownHover" + props.temp_idx.toString()}
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={"dropdownHoverButton" + props.temp_idx.toString()}
        >
          {props.values.map((value: string, index: number) => {
            return (
              <li key={index}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  {props.type === "radio" ? (
                    <input
                      id={value.toLowerCase()}
                      type="radio"
                      value=""
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        event.preventDefault();
                        const setfunc = props.setter
                        props.setter(event.target.value);
                        console.log(props.passwordType);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  ) : (
                    <input
                      checked={}
                      id={value.toLowerCase()}
                      type="checkbox"
                      value=""
                      onChange={props.changeFunc}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  )}
                  <label
                    htmlFor={value.toLowerCase()}
                    className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {value}
                  </label>
                </div>
                {/* <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {value}
                </a> */}
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
