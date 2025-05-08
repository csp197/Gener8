import TypeIt from "typeit-react";
// import randomInt from "../../utils/random-int";

/**
 * Header component that displays the application title with a dynamic punctuation
 * mark in between. The title is styled based on the theme and uses the TypeIt
 * component for typing animation. The punctuation mark is randomly selected from
 * an array of symbols.
 */
const Header = () => {
  const punctuationSymbols = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    ";",
    ":",
    "",
    "'",
    ",",
    ".",
    "`",
    "~",
    "-",
    "_",
    "=",
    "+",
    "-",
    "_",
    "+",
    "=",
    ">",
    "~",
    "*",
    "#",
    "@",
  ];

  return (
    <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-typewriter">
      <TypeIt>
        <span className="text-purple-600 dark:text-purple-500">Gener</span>
        {
          punctuationSymbols[
            Math.floor(Math.random() * punctuationSymbols.length)
          ]
        }
        <span className="text-purple-600 dark:text-purple-500">8</span>
      </TypeIt>
    </h1>
  );
};

export default Header;
