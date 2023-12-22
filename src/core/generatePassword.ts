import { generate } from 'generate-password-ts';
import randomInt from '../utils/random-int';

const generatePassword = (
  length: number, type: string, options: {
    params: {
      id: number;
      value: string;
      isChecked: boolean;
    }[];
  }
) => {

  const args = {
    length: length < 10 ? 10 : length,
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
    args.numbers = false;
    args.symbols = false;
    args.uppercase = true;
    args.lowercase = true;
  } else if (type === "Numeric") {
    args.symbols = false;
    args.lowercase = false;
    args.uppercase = false;
    args.numbers = true;
  }

  options.params.map(option => {
    console.log(option);
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

  console.log(args);
  if (!(args.numbers || args.symbols || args.lowercase || args.uppercase)) {
    let err_str = "ERROR - At least one option must be selected";
    if (randomInt(0, 10) % 2 == 0) {
      err_str = "You might as well put \"Password\" at this point because you haven't given me any options lol";
    }
    return err_str;
  }

  return generate(args).slice(0, length);
};

export default generatePassword;
