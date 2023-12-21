interface IRangeSliderProps {
  min: number;
  max: number;
  state: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
}

const RangeSlider = (props: IRangeSliderProps) => {
  return (
    <div className="py-9">
      <label className="block mb-2 text-sm font-medium">
        Length: {props.state}
      </label>
      <input
        type="range"
        min={props.min}
        max={props.max.toString()}
        value={props.state.toString()}
        className="range range-error"
        onChange={(event) => {
          props.setter(parseInt(event.target.value));
        }}
      />
    </div>
  );
};

export default RangeSlider;
