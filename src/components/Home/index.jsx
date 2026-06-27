"use client";
/* eslint-disable react/prop-types */
import "./index.css";
import { useTranslation } from "react-i18next";

export const Home = ({ setActiveSection }) => {
  const { t } = useTranslation();

  return (
    <section id="home" className="home__section">
      <div className="home__content-container">
        <p className="home__greeting">{t("home.home-title")}</p>
        <h1 className="home__main-name">
          {t("home.home-name-char")} <span>{t("home.home-name")}</span>
        </h1>

        <div className="home__type-wrap">
          <span className="type-animation">
            {t("home.home-back")}
          </span>
        </div>

        <div className="home__cta-buttons">
          <button
            onClick={() => setActiveSection("projects")}
            className="cta-btn primary-btn"
          >
            {t("projects.title")}
          </button>

          <button
            onClick={() => setActiveSection("contact")}
            className="cta-btn secondary-btn"
          >
            {t("contact.title")}
          </button>
        </div>
      </div>
    </section>
  );
};

