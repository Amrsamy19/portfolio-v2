/* eslint-disable react/prop-types */
import "./index.css";
import { TypeAnimation } from "react-type-animation";
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
          <TypeAnimation
            sequence={[t("home.home-front"), 1000, t("home.home-back"), 1000]}
            wrapper="span"
            speed={50}
            className="type-animation"
            repeat={Infinity}
          />
        </div>

        <div className="home__cta-buttons">
          <button
            onClick={() => setActiveSection("projects")}
            className="cta-btn primary-btn"
          >
            {t("projects.title")} &rarr;
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
