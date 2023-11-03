import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import PasswordInput from "./components/PasswordInput/PasswordInput";
import Options from "./components/Options/Options";
import RangeSlider from "./components/RangeSlider/RangeSlider";

function App() {
  const [passwordType, setPasswordType] = useState("");
  const [passwordLength, setPasswordLength] = useState(5);
  const [passwordOptions, setPasswordOptions] = useState<string[]>([]);

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen">
    <>
      <Header />
      <PasswordInput />
      <Options
        dropdownTitles={["Password Type:", "Options:"]}
        dropdownValues={[["Alphanumeric", "Alphabetical", "Numeric", "Catchy"],["{A-Z}","{a-z}","0-9", "!@#$%^&*();:',.`~-_=+"]]}
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
