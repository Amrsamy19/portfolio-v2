"use client";
/* eslint-disable react/prop-types */
//TODO: Fix dark mode on this part

import {
  PythonOriginal,
  PytorchOriginal,
  TensorflowOriginal,
  ScikitlearnOriginal,
  KerasOriginal,
  PandasOriginal,
  NumpyOriginal,
  OpencvOriginal,
  JupyterOriginal,
  KaggleOriginal,
  Css3Original,
  JavascriptOriginal,
  ReactOriginal,
  Html5Original,
  JavaOriginal,
  CplusplusOriginal,
  COriginal,
  KotlinOriginal,
  NodejsOriginal,
  ExpressOriginal,
  MongodbOriginal,
} from "devicons-react";
import ProfilePic from "../../assets/me-about.jpeg";
import "./index.css";
import { useTranslation } from "react-i18next";

const ICON_MAP = {
  "Python": PythonOriginal,
  "PyTorch": PytorchOriginal,
  "TensorFlow": TensorflowOriginal,
  "Scikit-learn": ScikitlearnOriginal,
  "Keras": KerasOriginal,
  "Pandas": PandasOriginal,
  "NumPy": NumpyOriginal,
  "OpenCV": OpencvOriginal,
  "Jupyter": JupyterOriginal,
  "Kaggle": KaggleOriginal,
  "React": ReactOriginal,
  "Javascript": JavascriptOriginal,
  "Html": Html5Original,
  "Css": Css3Original,
  "Java": JavaOriginal,
  "C": COriginal,
  "C++": CplusplusOriginal,
  "Kotlin": KotlinOriginal,
  "Node.js": NodejsOriginal,
  "Express": ExpressOriginal,
  "MongoDB": MongodbOriginal,
};

const Technologies = (props) => {
  const { t } = useTranslation();
  let aiSkills = t("about.aiSkills", { returnObjects: true });
  
  // Fallback to defaults if not set or empty
  if (!Array.isArray(aiSkills) || aiSkills.length === 0) {
    aiSkills = ["React", "Javascript", "Html", "Css", "Java", "C", "C++", "Python", "Kotlin"];
  }

  return (
    <div>
      <h2 className="skills__title">{props.title}</h2>
      <div className="skills__grid">
        {aiSkills.map((skill, index) => {
          const Icon = ICON_MAP[skill];
          return (
            <div className="skill__box" key={index}>
              {Icon ? <Icon size={60} aria-label={skill} /> : <div style={{height: 60, width: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", borderRadius: "50%"}}><span>{skill[0]}</span></div>}
              <label className="english__font">{skill}</label>
            </div>
          );
        })}
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
          <img src={t("about.image") && t("about.image") !== "about.image" ? t("about.image") : ProfilePic.src} alt="profile" />
        </div>
        <div className="about__content">
          <p className="about__body-text">{t("about.description")}</p>
          <Technologies title={t("about.skills")} />
        </div>
      </div>
    </section>
  );
};

