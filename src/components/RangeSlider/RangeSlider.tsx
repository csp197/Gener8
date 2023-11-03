import { useEffect } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  state: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
}

const RangeSlider = (props: RangeSliderProps) => {
  // eslint-disable-next-line
  function handleChange(event: any) {
    event.preventDefault();
    const value = parseInt(event.target.value);
    props.setter(value);
  }

  useEffect(() => {});

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
        onChange={handleChange}
      />
    </div>
  );
};

export default RangeSlider;
