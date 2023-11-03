import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import PasswordField from "./components/PasswordField/PasswordField";
import Options from "./components/Options/Options";
import RangeSlider from "./components/RangeSlider/RangeSlider";

function App() {
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("");
  const [passwordLength, setPasswordLength] = useState(5);

  const optionsMap = {
    uppercase: false,
    lowercase: false,
    numbers: false,
    punctuation: false,
  };

  const [passwordOptions, setPasswordOptions] = useState(optionsMap);

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen">
    <>
      <Header />
      <PasswordField passwordState={password} />
      <Options
        dropdownTitles={["Password Type:", "Options:"]}
        dropdownValues={[
          ["Alphanumeric", "Alphabetical", "Numeric", "Catchy"],
          ["Uppercase", "Lowercase", "Numbers", "Punctuation"],
        ]}
        dropdownClasses={["btn-info", "btn-warning"]}
        password={password}
        passwordType={passwordType}
        setPasswordType={setPasswordType}
        passwordOptions={passwordOptions}
        setPasswordOptions={setPasswordOptions}
      />
      <RangeSlider
        min={3}
        max={50}
        state={passwordLength}
        setter={setPasswordLength}
      />
      {/* <Footer /> */}
    </>
  );
}

export default App;
