/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {props.children}
      </ThemeContext.Provider>
    </>
  );
}

export { ThemeContext, ThemeProvider };
