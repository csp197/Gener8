interface IRangeSliderProps {
  min: number;
  max: number;
  passwordLength: number;
  passwordLengthSetter: React.Dispatch<React.SetStateAction<number>>;
}

const RangeSlider = ({
  min,
  max,
  passwordLength,
  passwordLengthSetter,
}: IRangeSliderProps) => {
  return (
    <div className="py-9">
      <label className="block mb-2 text-sm font-medium">
        Length: {passwordLength}
      </label>
      <input
        type="range"
        min={min}
        max={max.toString()}
        value={passwordLength.toString()}
        className="range range-error"
        onChange={(event) => {
          if (parseInt(event.target.value) >= min) {
            passwordLengthSetter(parseInt(event.target.value));
          }
        }}
      />
    </div>
  );
};

export default RangeSlider;
