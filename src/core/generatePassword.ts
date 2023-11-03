import { generate } from "generate-passphrase";

const generatePassword = (optionsMap: { [key: string]: boolean }) => {
  console.log(optionsMap);

  return generate();
};

export default generatePassword;
