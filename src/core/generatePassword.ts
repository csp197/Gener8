import { generate } from 'generate-password-ts';
import randomInt from '../utils/random-int';

/**
 * Generates a random password based on given type and options.
 *
 * @param {string} type - The type of password to generate. Can be Alphanumeric, Alphabetical, or Numeric.
 * @param {{params: {value: string; isChecked: boolean}[]}} options - The options for generating the password.
 * @param {number} MAX_SIZE - The maximum length of the generated password.
 *
 * @returns {string} The generated password.
 */
const generatePassword = (type: string, options: {
  params: {
    value: string;
    isChecked: boolean;
  }[];
}, MAX_SIZE: number
) => {

  const args = {
    length: MAX_SIZE,
    numbers: false,
    symbols: false,
    lowercase: false,
    uppercase: false,
    excludeSimilarCharacters: true,
    exclude: '',
    strict: true
  };

  if (type === "Alphanumeric") {
    args.symbols = false;
    args.lowercase = true;
    args.uppercase = true;
    args.numbers = true;
  } else if (type === "Alphabetical") {
    args.symbols = false;
    args.lowercase = true;
    args.uppercase = true;
    args.numbers = false;
  } else if (type === "Numeric") {
    args.symbols = false;
    args.lowercase = false;
    args.uppercase = false;
    args.numbers = true;
  }

  options.params.map(option => {
    // console.log(option);
    if (option.isChecked) {
      if (option.value === "Uppercase") {
        args.uppercase = true;
      }
      else if (option.value === "Lowercase") {
        args.lowercase = true;
      } else if (option.value === "Numbers") {
        args.numbers = true;
      } else if (option.value === "Symbols") {
        args.symbols = true;
      }
    }
  })

  // console.log(args);
  if (!(args.numbers || args.symbols || args.lowercase || args.uppercase)) {
    let err_str = "ERROR - At least one option must be selected";
    if (randomInt(0, 10) % 2 == 0) {
      err_str = "You might as well put \"Password\" at this point because you haven't given me any options lol";
    }
    return err_str;
  }

  return generate(args);
};

export default generatePassword;
