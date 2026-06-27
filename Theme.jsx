"use client";
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

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
