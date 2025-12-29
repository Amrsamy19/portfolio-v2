import { useContext, useState } from "react";
import { ThemeContext } from "../Theme";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Header } from "./components/Header";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { useTranslation } from "react-i18next";
import "./App.css";

export const App = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("home");

  const renderActiveComponent = () => {
    switch (activeSection) {
      case "home":
        return <Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact darkMode={darkMode} />;
      default:
        return <Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
    }
  };

  return (
    <div
      className={`App ${darkMode ? "home__dark" : "home__light"} ${
        i18n.language === "ar" ? "arabic__font" : "english__font"
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main>{renderActiveComponent()}</main>
    </div>
  );
};
