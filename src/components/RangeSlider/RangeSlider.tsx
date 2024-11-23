interface IRangeSliderProps {
  min: number;
  max: number;
  passwordLength: number;
  passwordLengthSetter: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * RangeSlider component that provides a slider input for adjusting the password length.
 *
 * @param {number} min - The minimum value for the range slider.
 * @param {number} max - The maximum value for the range slider.
 * @param {number} passwordLength - The current length of the password, representing the slider's current position.
 * @param {React.Dispatch<React.SetStateAction<number>>} passwordLengthSetter - The setter function to update the password length.
 *
 * @returns {JSX.Element} The rendered RangeSlider component with a label and input slider.
 */
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
