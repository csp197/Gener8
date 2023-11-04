import { generate } from "generate-passphrase";

const generatePassword = (length: number, type: string, options: boolean[]) => {
  console.log(`the requested length is ${length}`);
  console.log(`the requested type is ${type}`);
  console.log(`the requested options are ${options}`);

  return generate();
};

export default generatePassword;
