// import { generate } from "generate-passphrase";
import { generate } from 'generate-password-ts';

const generatePassword = (
  length: number, type: string, options: {
    id: number;
    value: string;
    isChecked: boolean;
  }[]
) => {
  console.log(`the requested length is ${length}`);
  console.log(`the requested type is ${type}`);
  console.log(`the requested options are ${options}`);

  return generate({
    length: length,
    numbers: true
  });
};

export default generatePassword;
