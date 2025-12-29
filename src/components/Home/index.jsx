/* eslint-disable react/prop-types */
import "./index.css";
import { TypeAnimation } from "react-type-animation";
import { ThemeToggle, LanguageButton } from "../Toggle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Email } from "@mui/icons-material";

export const Home = (props) => {
  const { t, i18n } = useTranslation();
  const [seed, setSeed] = useState(1);

  const reset = () => {
    setSeed(Math.random());
  };

  const handleChange = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <section id="home" className="home__section">
      <div className="home__content-container">
        <p className="home__greeting">{t("home.home-title")}</p>
        <h1 className="home__main-name">
          {t("home.home-name-char")} <span>{t("home.home-name")}</span>
        </h1>

        <div className="home__type-wrap">
          <TypeAnimation
            sequence={[t("home.home-front"), 1000, t("home.home-back"), 1000]}
            wrapper="span"
            speed={50}
            className="type-animation"
            repeat={Infinity}
            key={seed}
          />
        </div>

        <div className="home__cta-buttons">
          <a href="#projects" className="cta-btn primary-btn">
            {t("projects.title")} &rarr;
          </a>
          <a href="#contact" className="cta-btn secondary-btn">
            {t("contact.title")} <Email sx={{ ml: 1, fontSize: 20 }} />
          </a>
        </div>
      </div>
    </section>
  );
};
