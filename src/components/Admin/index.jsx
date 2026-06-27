"use client";
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Link from "next/link";
import { LightMode, DarkMode, Language } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import ProfilePic from "../../assets/me-about.jpeg";
import "./index.css";

const TECH_OPTIONS = [
  "React", "Javascript", "TypeScript", "HTML5", "CSS3", "Java",
  "C", "C++", "Python", "Kotlin", "Node.js", "Express", "MongoDB",
  "PyTorch", "TensorFlow", "Machine Learning", "AI", "Preact"
];

const AI_SKILLS_OPTIONS = [
  "Python", "PyTorch", "TensorFlow", "Scikit-learn", "Keras",
  "Pandas", "NumPy", "OpenCV", "Jupyter", "Kaggle",
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision"
];

const TechInput = ({ technologies, onChange, options = TECH_OPTIONS, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = options.filter(tech =>
    tech.toLowerCase().includes(inputValue.toLowerCase()) &&
    !technologies.includes(tech)
  );

  const handleAdd = (tech) => {
    if (!technologies.includes(tech)) {
      onChange([...technologies, tech]);
    }
    setInputValue("");
    setShowDropdown(false);
  };

  const handleRemove = (techToRemove) => {
    onChange(technologies.filter(tech => tech !== techToRemove));
  };

  return (
    <div>
      <div className="admin__tech-pills">
        {technologies.map((tech, i) => (
          <span key={i} className="admin__tech-pill">
            {tech}
            <button onClick={() => handleRemove(tech)}>×</button>
          </span>
        ))}
      </div>
      <div className="admin__tech-input-wrapper">
        <input
          type="text"
          placeholder={placeholder}
          className="admin__input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim() !== "") {
              e.preventDefault();
              handleAdd(inputValue.trim());
            }
          }}
        />
        {showDropdown && filteredOptions.length > 0 && (
          <div className="admin__custom-dropdown">
            {filteredOptions.map((option, i) => (
              <div
                key={i}
                className="admin__dropdown-item"
                onMouseDown={() => handleAdd(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminDashboard = ({ darkMode, toggleDarkMode }) => {
  const { t, i18n } = useTranslation();
  
  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem("adminActiveTab") || "home");
  const [projectsData, setProjectsData] = useState([]);
  const [originalProjectsData, setOriginalProjectsData] = useState([]);
  const [enData, setEnData] = useState(null);
  const [arData, setArData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    sessionStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projRes, enRes, arRes] = await Promise.all([
        fetch("/api/data", { headers: { "x-data-type": "projects" } }),
        fetch("/api/data", { headers: { "x-data-type": "en-translation" } }),
        fetch("/api/data", { headers: { "x-data-type": "ar-translation" } })
      ]);
      const projJson = await projRes.json();
      setProjectsData(projJson);
      setOriginalProjectsData(JSON.parse(JSON.stringify(projJson)));
      setEnData(await enRes.json());
      setArData(await arRes.json());
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const saveData = async () => {
    setMessage(t("admin.messages.saving"));
    try {
      // Run sequentially to prevent GitHub API branch conflicts (409 errors)
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "projects", content: projectsData }),
      });
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "en-translation", content: enData }),
      });
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "ar-translation", content: arData }),
      });
      setMessage(t("admin.messages.saved"));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(t("admin.messages.error"));
      console.error(err);
    }
  };

  const saveProjectData = async (newProjects = projectsData) => {
    setMessage(t("admin.messages.saving_proj"));
    try {
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "projects", content: newProjects }),
      });
      setProjectsData(newProjects);
      setOriginalProjectsData(JSON.parse(JSON.stringify(newProjects)));
      setMessage(t("admin.messages.saved_proj"));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(t("admin.messages.error_proj"));
      console.error(err);
    }
  };

  const handleUploadImage = async (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, base64: reader.result }),
        });
        const json = await res.json();
        if (json.success) {
          callback(json.path);
        }
      } catch (err) {
        console.error(err);
      }
    };
  };

  const updateTranslation = (lang, section, key, value) => {
    if (lang === "en") {
      setEnData(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
    } else {
      setArData(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
    }
  };

  const renderDualInput = (label, section, key, isTextArea = false) => {
    return (
      <div className="admin__dual-input">
        <label className="admin__dual-label">{label}</label>
        <div className="admin__dual-fields">
          <div className="admin__field-wrapper">
            <span className="admin__lang-badge">EN</span>
            {isTextArea ? (
              <textarea
                value={enData[section][key] || ""}
                onChange={(e) => updateTranslation("en", section, key, e.target.value)}
              />
            ) : (
              <input
                type="text"
                value={enData[section][key] || ""}
                onChange={(e) => updateTranslation("en", section, key, e.target.value)}
              />
            )}
          </div>
          <div className="admin__field-wrapper arabic__font">
            <span className="admin__lang-badge ar">AR</span>
            {isTextArea ? (
              <textarea
                dir="rtl"
                value={arData[section][key] || ""}
                onChange={(e) => updateTranslation("ar", section, key, e.target.value)}
              />
            ) : (
              <input
                type="text"
                dir="rtl"
                value={arData[section][key] || ""}
                onChange={(e) => updateTranslation("ar", section, key, e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderHomeContent = () => (
    <div className="admin__tab-content">
      <h3>{t("admin.home.hero")}</h3>
      {renderDualInput(t("admin.home.title"), "home", "home-title")}
      {renderDualInput(t("admin.home.intro"), "home", "home-name-char")}
      {renderDualInput(t("admin.home.name"), "home", "home-name")}
      {renderDualInput(t("admin.home.role"), "home", "home-back")}
    </div>
  );

  const renderAboutContent = () => (
    <div className="admin__tab-content">
      <h3>{t("admin.about.section")}</h3>
      <div className="admin__image-upload" style={{ marginBottom: "2rem" }}>
        <p>{t("admin.about.profile_image")} {enData?.about?.image || t("admin.about.default")}</p>
        <img
          src={enData?.about?.image && enData.about.image !== "about.image" ? enData.about.image : ProfilePic.src}
          alt="Profile Preview"
          style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%", marginBottom: "1rem", border: "2px solid #db6db8" }}
        />
        <input
          type="file"
          accept="image/*"
          style={{ paddingTop: "10px" }}
          onChange={(e) => {
            if (e.target.files[0]) {
              handleUploadImage(e.target.files[0], (path) => {
                updateTranslation("en", "about", "image", path);
                updateTranslation("ar", "about", "image", path);
              });
            }
          }}
        />
      </div>
      {renderDualInput(t("admin.about.title"), "about", "title")}
      {renderDualInput(t("admin.about.bio"), "about", "description", true)}
      {renderDualInput(t("admin.about.skills"), "about", "skills")}

      <div className="admin__image-upload" style={{ marginTop: "2rem" }}>
        <p>{t("admin.about.cv")} {enData?.contact?.cv || "/Marwan_cv.pdf"}</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            if (e.target.files[0]) {
              handleUploadImage(e.target.files[0], (path) => {
                updateTranslation("en", "contact", "cv", path);
                updateTranslation("ar", "contact", "cv", path);
              });
            }
          }}
        />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <label className="admin__dual-label">{t("admin.about.ai_skills")}</label>
        <TechInput
          technologies={enData?.about?.aiSkills || []}
          options={AI_SKILLS_OPTIONS}
          placeholder={t("admin.messages.add_tech")}
          onChange={(newTech) => {
            updateTranslation("en", "about", "aiSkills", newTech);
            updateTranslation("ar", "about", "aiSkills", newTech);
          }}
        />
      </div>
    </div>
  );

  const renderProjectsContent = () => (
    <div className="admin__projects-grid">
      {projectsData.map((project, index) => (
        <div key={index} className="admin__project-card glass-card">
          <input
            type="text"
            value={project.title}
            onChange={(e) => {
              const newData = [...projectsData];
              newData[index].title = e.target.value;
              setProjectsData(newData);
            }}
            placeholder={t("admin.projects.title")}
            className="admin__input"
          />
          <textarea
            value={project.description}
            onChange={(e) => {
              const newData = [...projectsData];
              newData[index].description = e.target.value;
              setProjectsData(newData);
            }}
            placeholder={t("admin.projects.desc")}
            className="admin__input"
          />
          <TechInput
            technologies={project.technologies}
            placeholder={t("admin.messages.add_tech")}
            onChange={(newTech) => {
              const newData = [...projectsData];
              newData[index].technologies = newTech;
              setProjectsData(newData);
            }}
          />
          <input
            type="text"
            value={project.repo}
            onChange={(e) => {
              const newData = [...projectsData];
              newData[index].repo = e.target.value;
              setProjectsData(newData);
            }}
            placeholder={t("admin.projects.repo")}
            className="admin__input"
          />

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              className="admin__btn primary"
              disabled={JSON.stringify(project) === JSON.stringify(originalProjectsData[index])}
              style={{ opacity: JSON.stringify(project) === JSON.stringify(originalProjectsData[index]) ? 0.5 : 1, cursor: JSON.stringify(project) === JSON.stringify(originalProjectsData[index]) ? "not-allowed" : "pointer" }}
              onClick={() => saveProjectData()}
            >{t("admin.projects.save")}</button>
            <button className="admin__btn danger" onClick={() => {
              if (window.confirm(t("admin.projects.confirm_delete"))) {
                const newData = projectsData.filter((_, i) => i !== index);
                saveProjectData(newData);
              }
            }}>{t("admin.projects.delete")}</button>
          </div>
        </div>
      ))}
      <div className="admin__project-card glass-card admin__add-project">
        <button 
          className="admin__btn primary"
          onClick={() => {
            setProjectsData([...projectsData, {
              id: Date.now().toString(),
              title: "New Project",
              description: "",
              technologies: [],
              repo: "",
              link: ""
            }]);
          }}
        >
          {t("admin.projects.add")}
        </button>
      </div>
    </div>
  );

  if (loading || !enData || !arData) {
    return (
      <div className="admin__loading-container" style={{ color: darkMode ? "#db6db8" : "#3c0753" }}>
        <div className="admin__loader"></div>
        <p>{t("admin.messages.loading")}</p>
      </div>
    );
  }

  return (
    <div className="admin__container" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="glass-card admin__main-card">
        <div className="admin__header">
          <h1>{t("admin.dashboard")}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              onClick={toggleDarkMode}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              title="Toggle Theme"
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </span>
            <span
              onClick={handleLanguageChange}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              title="Change Language"
            >
              <Language />
            </span>
            <Link href="/" className="admin__btn">
              {t("admin.back")}
            </Link>
          </div>
        </div>

        <div className="admin__tabs">
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            {t("admin.tabs.home")}
          </button>
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            {t("admin.tabs.about")}
          </button>
          <button
            className={activeTab === "projects" ? "active" : ""}
            onClick={() => setActiveTab("projects")}
          >
            {t("admin.tabs.projects")}
          </button>
        </div>

        <div className="admin__content">
          {activeTab === "home" && renderHomeContent()}
          {activeTab === "about" && renderAboutContent()}
          {activeTab === "projects" && renderProjectsContent()}
        </div>

        <div className="admin__footer">
          {message && <span className="admin__message">{message}</span>}
          {activeTab !== "projects" && (
            <button className="admin__btn primary large" onClick={saveData}>{t("admin.messages.save_all")}</button>
          )}
        </div>
      </div>
    </div>
  );
};

