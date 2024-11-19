import "./Button.css";

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
    <div>
      <label className="block mb-2 text-sm font-medium">{props.title}</label>
      <span className="inline-block ">
        <button
          id={props?.id}
          data-dropdown-toggle={props?.dropdownToggle}
          data-dropdown-trigger={props?.dropdownTrigger}
          className={"button" + " " + props.className}
          onClick={props.clickFunc}
        >
          {props.value}
          {props.svgCode}
        </button>
      </span>
    </div>
  );
};

export default Button;
