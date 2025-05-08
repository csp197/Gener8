import React from "react";

interface IButtonProps {
  title?: string;
  value: string;
  className: string;
  svgCode: JSX.Element;

  id?: string;
  dropdownToggle?: string;
  dropdownTrigger?: string;

  clickFunc?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: IButtonProps) => {
  return (
    <div className="w-full">
      {props.title && <label className="block mb-2 text-sm font-medium">{props.title}</label>}
      <span className="block">
        <button
          id={props?.id}
          data-dropdown-toggle={props?.dropdownToggle}
          data-dropdown-trigger={props?.dropdownTrigger}
          className={`relative rounded-full text-base text-white px-7 py-3 cursor-pointer select-none transition-all duration-300 hover:duration-100 active:top-0.5 flex items-center justify-center gap-2 ${props.className}`}
          onClick={props.clickFunc}
        >
          <span>{props.value}</span>
          <span className="flex items-center">{props.svgCode}</span>
        </button>
      </span>
    </div>
  );
};

export default Button;
