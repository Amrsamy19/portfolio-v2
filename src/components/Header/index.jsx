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
import { Tooltip, Fade, IconButton } from "@mui/material";

export const Header = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const handleNavClick = (section) => {
    props.setActiveSection(section);
  };

  return (
    <nav className="navbar">
      <button
        onClick={() => handleNavClick("home")}
        className={`navbar-logo-link ${
          props.activeSection === "home" ? "active" : ""
        }`}
      >
        <Tooltip
          title={t("navbar-links.home-link") || "Home"}
          placement={isRTL ? "left" : "right"}
          TransitionComponent={Fade}
          arrow
        >
          <HomeIcon
            className="navbar-logo-icon"
            sx={{
              fontSize: 40,
              color: props.activeSection === "home" ? "#db6db8" : "inherit",
            }}
          />
        </Tooltip>
      </button>

      <div className="navbar__links">
        <button
          onClick={() => handleNavClick("about")}
          className={props.activeSection === "about" ? "active" : ""}
        >
          <Tooltip
            title={t("navbar-links.about-link")}
            placement={isRTL ? "left" : "right"}
            TransitionComponent={Fade}
            arrow
          >
            <Person
              sx={{
                fontSize: 30,
                color: props.activeSection === "about" ? "#db6db8" : "inherit",
              }}
            />
          </Tooltip>
        </button>
        <button
          onClick={() => handleNavClick("projects")}
          className={props.activeSection === "projects" ? "active" : ""}
        >
          <Tooltip
            title={t("navbar-links.projects-link")}
            placement={isRTL ? "left" : "right"}
            TransitionComponent={Fade}
            arrow
          >
            <Terminal
              sx={{
                fontSize: 30,
                color:
                  props.activeSection === "projects" ? "#db6db8" : "inherit",
              }}
            />
          </Tooltip>
        </button>
        <button
          onClick={() => handleNavClick("contact")}
          className={props.activeSection === "contact" ? "active" : ""}
        >
          <Tooltip
            title={t("navbar-links.contact-link")}
            placement={isRTL ? "left" : "right"}
            TransitionComponent={Fade}
            arrow
          >
            <Email
              sx={{
                fontSize: 30,
                color:
                  props.activeSection === "contact" ? "#db6db8" : "inherit",
              }}
            />
          </Tooltip>
        </button>
      </div>

      <div className="navbar__divider"></div>

      <div className="navbar__controls">
        <Tooltip
          title={props.darkMode ? "Light Mode" : "Dark Mode"}
          placement={isRTL ? "left" : "right"}
          TransitionComponent={Fade}
          arrow
        >
          <IconButton
            onClick={props.toggleDarkMode}
            className="navbar__control-btn"
            sx={{ color: "inherit" }}
          >
            {props.darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>

        <Tooltip
          title={i18n.language === "en" ? "العربية" : "English"}
          placement={isRTL ? "left" : "right"}
          TransitionComponent={Fade}
          arrow
        >
          <IconButton
            onClick={handleLanguageChange}
            className="navbar__control-btn"
            sx={{ color: "inherit" }}
          >
            <Language />
          </IconButton>
        </Tooltip>
      </div>
    </nav>
  );
};
