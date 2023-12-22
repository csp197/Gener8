import Button from "../Button/Button";
import TypeDropdown from "../Dropdown/TypesDropdown";
import OptionsDropdown from "../Dropdown/OptionsDropdown";

import "./Selections.css";

interface OptionsProps {
  dropdownTitles: string[];
  dropdownValues: string[][];
  dropdownClasses: string[];
  passwordState: string;
  passwordTypeState: string;
  passwordOptionsState: {
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
}

const refreshSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="16px"
    height="16px"
  >
    <g
      // transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
      fill="#FFFFFF"
      // stroke="none"
    >
      <path d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z" />
    </g>
  </svg>
);

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

const Selections = (props: OptionsProps) => {
  return (
    <div className="flex-container">
      <TypeDropdown
        title={props.dropdownTitles[0]}
        values={props.dropdownValues[0]}
        className={props.dropdownClasses[0]}
        passwordTypeState={props.passwordTypeState}
        passwordTypeSetter={props.passwordTypeSetter}
      />
      <OptionsDropdown
        title={props.dropdownTitles[1]}
        values={props.dropdownValues[1]}
        className={props.dropdownClasses[1]}
        passwordOptionsState={props.passwordOptionsState}
        passwordOptionsSetter={props.passwordOptionsSetter}
      />
      <Button
        // title="Refresh Generated Password"
        value="Refresh"
        className="btn btn-outline btn-secondary"
        svgCode={refreshSvg}
        clickFunc={() => {}} // TODO: generate another password (possibly w/o refreshing the browser page)
      />
      <Button
        // title="Copy Generated Password"
        value="Copy"
        className="btn btn-outline btn-accent"
        svgCode={copySvg}
        clickFunc={() => {
          console.log(props.passwordState);
          navigator.clipboard.writeText(props.passwordState);
          // TODO: change text of button to `copied`? to indicate successful copy
        }}
      />
    </div>
  );
};

export default Selections;
