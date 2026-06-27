"use client";

import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../Theme";
import { Home } from "../src/components/Home";
import { About } from "../src/components/About";
import { Header } from "../src/components/Header";
import { Projects } from "../src/components/Projects";
import { Contact } from "../src/components/Contact";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderActiveComponent = () => {
    switch (activeSection) {
      case "home":
        return (
          <Home
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            setActiveSection={setActiveSection}
          />
        );
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

  if (!mounted) return null; // Avoid hydration mismatch for local storage

  return (
    <>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main>{renderActiveComponent()}</main>
    </>
  );
}
