import { useState } from "react";

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import PasswordField from "./components/PasswordField/PasswordField";
import Selections from "./components/Selections/Selections";
import RangeSlider from "./components/RangeSlider/RangeSlider";
import generatePassword from "./core/generatePassword";

/**
 * Main application component that renders the password generator interface.
 * It includes components for displaying and setting the password, selecting
 * password types and options, and adjusting the password length.
 *
 * Uses:
 * - `Header`: Displays the application header.
 * - `PasswordField`: Shows the generated password and allows for updates.
 * - `Selections`: Allows users to select password type and options.
 * - `RangeSlider`: Adjusts the password length within a defined range.
 *
 * State variables:
 * - `passwordLength`: Number, represents the length of the password.
 * - `passwordType`: String, type of password (e.g., Alphanumeric, Alphabetical, etc.).
 * - `passwordOptions`: Object, contains boolean values indicating selected password options.
 * - `password`: String, the generated password based on the selected options.
 */
function App() {
  const MIN_PASS_SIZE = 3;
  const MAX_PASS_SIZE = 150;

  const [passwordLength, setPasswordLength] = useState(20);
  const [passwordType, setPasswordType] = useState("Alphanumeric");
  const [passwordOptions, setPasswordOptions] = useState({
    params: [
      { id: 0, value: "Uppercase", isChecked: false },
      { id: 1, value: "Lowercase", isChecked: true },
      { id: 2, value: "Numbers", isChecked: true },
      { id: 3, value: "Symbols", isChecked: false },
    ],
  });

  const [password, setPassword] = useState(
    generatePassword(passwordType, passwordOptions, passwordLength)
  );

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen">
    <>
      <Header />
      <PasswordField
        passwordState={password}
        passwordSetter={setPassword}
        passwordType={passwordType}
        passwordLength={passwordLength}
        passwordOptions={passwordOptions}
      />
      <Selections // idx of dropdownArr are correlated with each other
        dropdownTitles={["Password Type:", "Options:"]}
        dropdownValues={[
          ["Alphanumeric", "Alphabetical", "Numerical"], //, "Catchy"],
          ["Uppercase", "Lowercase", "Numbers", "Symbols"],
        ]}
        dropdownClasses={["btn-info", "btn-warning"]}
        passwordState={password}
        passwordSetter={setPassword}
        passwordType={passwordType}
        passwordLength={passwordLength}
        passwordOptions={passwordOptions}
        passwordTypeSetter={setPasswordType}
        passwordOptionsSetter={setPasswordOptions}
      />
      <RangeSlider
        min={MIN_PASS_SIZE}
        max={MAX_PASS_SIZE}
        passwordLength={passwordLength}
        passwordLengthSetter={setPasswordLength}
      />
      {/* <Footer /> */}
    </>
  );
}

export default App;
// CHECK <React.StrictMode> ! in main.tsx
