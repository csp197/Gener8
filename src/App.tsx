import { useState } from "react";
// import './App.css'

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import PasswordField from "./components/PasswordField/PasswordField";
import Options from "./components/Options/Options";
import RangeSlider from "./components/RangeSlider/RangeSlider";

function App() {
  const [
    password,
    // setPassword
  ] = useState("");
  const [passwordType, setPasswordType] = useState("Alphanumeric");
  const [passwordLength, setPasswordLength] = useState(20);

  const options = [
    // options: {
    // 1: false, // upper
    // 2: false, // lower
    // 3: false, // nums
    // 4: false, // punc
    // },
    { id: 1, value: "Uppercase", isChecked: false },
    { id: 2, value: "Lowercase", isChecked: false },
    { id: 3, value: "Numbers", isChecked: false },
    { id: 4, value: "Symbols", isChecked: false },
  ];
  // };

  const [passwordOptions, setPasswordOptions] = useState(options);

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen">
    <>
      <Header />
      <PasswordField
        passwordState={password}
        passwordLength={passwordLength}
        passwordType={passwordType}
        passwordOptions={passwordOptions}
      />
      <Options // idx of dropdownArr are correlated with each other
        dropdownTitles={["Password Type:", "Options:"]}
        dropdownValues={[
          ["Alphanumeric", "Alphabetical", "Numerical"], //, "Catchy"],
          ["Uppercase", "Lowercase", "Numbers", "Symbols"],
        ]}
        dropdownClasses={["btn-info", "btn-warning"]}
        passwordState={password}
        passwordTypeState={passwordType}
        passwordOptionsState={passwordOptions}
        passwordTypeSetter={setPasswordType}
        passwordOptionsSetter={setPasswordOptions}
      />
      <RangeSlider
        min={3}
        max={175}
        state={passwordLength}
        setter={setPasswordLength}
      />
      {/* <Footer /> */}
    </>
  );
}

export default App;
