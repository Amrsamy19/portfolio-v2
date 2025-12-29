/* eslint-disable react/prop-types */
//TODO: Fix dark mode on this part

import {
  Css3Original,
  JavascriptOriginal,
  ReactOriginal,
  Html5Original,
  JavaOriginal,
  CplusplusOriginal,
  PythonOriginal,
  COriginal,
  KotlinOriginal,
} from "devicons-react";
import ProfilePic from "../../assets/me-about.jpeg";
import "./index.css";
import { useTranslation } from "react-i18next";

const Technologies = (props) => {
  return (
    <div>
      <h2 className="skills__title">{props.title}</h2>
      <div className="skills__grid">
        <div className="skill__box">
          <ReactOriginal size={60} aria-label="React" />
          <label className="english__font">React</label>
        </div>
        <div className="skill__box">
          <JavascriptOriginal size={60} aria-label="Javascript" />
          <label className="english__font">Javascript</label>
        </div>
        <div className="skill__box">
          <Html5Original size={60} aria-label="Html" />
          <label className="english__font">Html</label>
        </div>
        <div className="skill__box">
          <Css3Original size={60} aria-label="Css" />
          <label className="english__font">Css</label>
        </div>
        <div className="skill__box">
          <JavaOriginal size={60} aria-label="Java" />
          <label className="english__font">Java</label>
        </div>
        <div className="skill__box">
          <COriginal size={60} aria-label="C" />
          <label className="english__font">C</label>
        </div>
        <div className="skill__box">
          <CplusplusOriginal size={60} aria-label="C++" />
          <label className="english__font">C++</label>
        </div>
        <div className="skill__box">
          <PythonOriginal size={60} aria-label="Python" />
          <label className="english__font">Python</label>
        </div>
        <div className="skill__box">
          <KotlinOriginal size={60} aria-label="Kotlin" />
          <label className="english__font">Kotlin</label>
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="about__section">
      <h2 className="about__title">{t("about.title")}</h2>
      <div className="about__grid">
        <div className="about__img">
          <img src={ProfilePic} alt="profile" />
        </div>
        <div className="about__content">
          <p className="about__body-text">{t("about.description")}</p>
          <Technologies title={t("about.skills")} />
        </div>
      </div>
    </section>
  );
};
