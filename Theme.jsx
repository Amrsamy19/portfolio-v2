/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio_theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  const toggleDarkMode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("portfolio_theme", newTheme ? "dark" : "light");
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
