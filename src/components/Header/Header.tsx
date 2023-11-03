import TypeIt from "typeit-react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        <TypeIt>
          <span className="text-purple-600 dark:text-purple-500">Gener</span>8
        </TypeIt>
      </h1>
    </>
  );
};

export default Header;
