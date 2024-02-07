import { useState } from "react";

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import PasswordField from "./components/PasswordField/PasswordField";
import Selections from "./components/Selections/Selections";
import RangeSlider from "./components/RangeSlider/RangeSlider";
import generatePassword from "./core/generatePassword";

function App() {

  const MIN_PASS_SIZE = 1;
  const MAX_PASS_SIZE = 150;

  const [passwordLength, setPasswordLength] = useState(20);
  const [passwordType, setPasswordType] = useState("Alphanumeric");
  const [passwordOptions, setPasswordOptions] = useState({
    params: [
      { id: 1, value: "Uppercase", isChecked: false },
      { id: 2, value: "Lowercase", isChecked: true },
      { id: 3, value: "Numbers", isChecked: true },
      { id: 4, value: "Symbols", isChecked: false },
    ],
  });
  const [password, setPassword] = useState(
    generatePassword(passwordType, passwordOptions, MAX_PASS_SIZE)
  );

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen">
    <>
      <Header />
      <PasswordField
        passwordState={password}
        passwordSetter={setPassword}
        passwordLength={passwordLength}
        passwordType={passwordType}
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
