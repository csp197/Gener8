// import { generate } from "generate-passphrase";
import { generate } from 'generate-password-ts';

const generatePassword = (
  length: number, type: string, options: {
    id: number;
    value: string;
    isChecked: boolean;
  }[]
) => {

  // console.log(type);


  const args = {
    length: length,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    excludeSimilarCharacters: true,
    exclude: '',
    strict: true
  };

  if (type === "Alphabetical") {
    args.numbers = false;
    args.symbols = false;
    // console.log(args);
  } else if (type === "Numeric") {
    args.symbols = false;
    args.lowercase = false;
    args.uppercase = false;
  }
  // else if (type === "Catchy") {
  //   console.log("TODO...");
  // }

  // console.log(`the requested type is ${type}`);
  // console.log(`the requested options are ${options}`);

  return generate(args);
};

export default generatePassword;
