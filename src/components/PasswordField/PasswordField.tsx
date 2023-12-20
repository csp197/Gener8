// import { useState } from "react";

import generatePassword from "../../core/generatePassword";

interface PasswordFieldProps {
  passwordState: string;
  passwordLength: number;
  passwordType: string;
  passwordOptions: {
    id: number;
    value: string;
    isChecked: boolean;
  }[];
}

const PasswordField = (props: PasswordFieldProps) => {
  const generatedPassword = generatePassword(
    props.passwordLength,
    props.passwordType,
    props.passwordOptions
  );
  return (
    <div className="mb-6">
      {/* <label
        htmlFor="success"
        className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
      >
        Password
      </label> */}
      <input
        type="text"
        id="success"
        className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
        // placeholder={props.passwordState}
        placeholder={generatedPassword}
      />
      {/* {password === "true" ? } */}
      <p className="mt-2 text-sm text-green-600 dark:text-green-500">
        {/* <span className="font-medium">This is secure!</span> */}
      </p>
    </div>
  );
};

export default PasswordField;
