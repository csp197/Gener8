interface ToggleProps {
    text: string
}

const Toggle = (props: ToggleProps) => {
  return (
    <>
      <div className="flex flex-col">
        {/* <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">Remember me</span>
            <input type="checkbox" className="toggle toggle-primary" checked />
          </label>
        </div>
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">Remember me</span>
            <input
              type="checkbox"
              className="toggle toggle-secondary"
              checked
            />
          </label>
        </div> */}
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">{props.text}</span>
            <input type="checkbox" className="toggle toggle-success" checked={false} />
          </label>
        </div>
      </div>
    </>
  );
};

export default Toggle;
