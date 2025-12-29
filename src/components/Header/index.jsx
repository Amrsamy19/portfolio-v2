import "./index.css";
import { useTranslation } from "react-i18next";
import {
  Person,
  Terminal,
  Email,
  Home as HomeIcon,
  Brightness4,
  Brightness7,
  Language,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const Header = ({
  activeSection,
  setActiveSection,
  darkMode,
  toggleDarkMode,
}) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <nav className="navbar">
      {/* Home Button */}
      <button
        onClick={() => setActiveSection("home")}
        className={`navbar-logo-link ${
          activeSection === "home" ? "active" : ""
        }`}
      >
        <HomeIcon sx={{ fontSize: 30 }} />
      </button>

      {/* Main Links */}
      <div className="navbar__links">
        <button
          onClick={() => setActiveSection("about")}
          className={activeSection === "about" ? "active" : ""}
        >
          <Person sx={{ fontSize: 28 }} />
        </button>
        <button
          onClick={() => setActiveSection("projects")}
          className={activeSection === "projects" ? "active" : ""}
        >
          <Terminal sx={{ fontSize: 28 }} />
        </button>
        <button
          onClick={() => setActiveSection("contact")}
          className={activeSection === "contact" ? "active" : ""}
        >
          <Email sx={{ fontSize: 28 }} />
        </button>
      </div>

      {/* Divider - Hidden on Mobile */}
      <div className="navbar__divider"></div>

      {/* Control Buttons */}
      <div className="navbar__controls">
        <IconButton
          onClick={toggleDarkMode}
          color="inherit"
          className="navbar__control-btn"
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <IconButton
          onClick={handleLanguageChange}
          color="inherit"
          className="navbar__control-btn"
        >
          <Language />
        </IconButton>
      </div>
    </nav>
  );
};
