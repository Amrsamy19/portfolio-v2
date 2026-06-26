/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LightMode, DarkMode } from "@mui/icons-material";
import "./index.css";

const TECH_OPTIONS = [
  "React", "Javascript", "TypeScript", "HTML5", "CSS3", "Java", 
  "C", "C++", "Python", "Kotlin", "Node.js", "Express", "MongoDB", 
  "PyTorch", "TensorFlow", "Machine Learning", "AI", "Preact"
];

const TechInput = ({ technologies, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = TECH_OPTIONS.filter(tech => 
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
          placeholder="Add Tech Skill and press Enter..."
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
  const [activeTab, setActiveTab] = useState("home");
  const [projectsData, setProjectsData] = useState([]);
  const [enData, setEnData] = useState(null);
  const [arData, setArData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      setProjectsData(await projRes.json());
      setEnData(await enRes.json());
      setArData(await arRes.json());
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const saveData = async () => {
    setMessage("Saving...");
    try {
      await Promise.all([
        fetch("/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "projects", content: projectsData }),
        }),
        fetch("/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "en-translation", content: enData }),
        }),
        fetch("/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "ar-translation", content: arData }),
        }),
      ]);
      setMessage("Saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error saving");
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
      <h3>Hero Section</h3>
      {renderDualInput("Title / Greeting", "home", "home-title")}
      {renderDualInput("Intro (I'm)", "home", "home-name-char")}
      {renderDualInput("Name", "home", "home-name")}
      {renderDualInput("Role / Tagline", "home", "home-back")}
    </div>
  );

  const renderAboutContent = () => (
    <div className="admin__tab-content">
      <h3>About Me Section</h3>
      <div className="admin__image-upload" style={{ marginBottom: "2rem" }}>
        <p>Profile Image: {enData?.about?.image || "Default"}</p>
        {enData?.about?.image && (
          <img
            src={enData.about.image}
            alt="Profile Preview"
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%", marginBottom: "1rem", border: "2px solid #db6db8" }}
          />
        )}
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
      {renderDualInput("Section Title", "about", "title")}
      {renderDualInput("Bio Description", "about", "description", true)}
      {renderDualInput("Skills Title", "about", "skills")}
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
            placeholder="Title"
            className="admin__input"
          />
          <textarea
            value={project.description}
            onChange={(e) => {
              const newData = [...projectsData];
              newData[index].description = e.target.value;
              setProjectsData(newData);
            }}
            placeholder="Description"
            className="admin__input"
          />
          <TechInput 
            technologies={project.technologies} 
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
            placeholder="Repo Link"
            className="admin__input"
          />
          <div className="admin__image-upload">
            <p>Image: {project.images[0]}</p>
            {project.images[0] && (
              <img
                src={project.images[0]}
                alt="Project Preview"
                style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleUploadImage(e.target.files[0], (path) => {
                    const newData = [...projectsData];
                    newData[index].images = [path];
                    setProjectsData(newData);
                  });
                }
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button className="admin__btn primary" onClick={saveData}>Save Project</button>
            <button className="admin__btn danger" onClick={() => {
              const newData = projectsData.filter((_, i) => i !== index);
              setProjectsData(newData);
            }}>Delete Project</button>
          </div>
        </div>
      ))}
      <div className="admin__project-card glass-card admin__add-project">
        <button className="admin__btn primary" onClick={() => {
          setProjectsData([...projectsData, {
            id: Date.now().toString(),
            title: "New Project",
            description: "",
            technologies: [],
            repo: "",
            link: "",
            images: []
          }]);
        }}>+ Add New Project</button>
      </div>
    </div>
  );

  if (loading || !enData || !arData) {
    return <div className="admin__container">Loading...</div>;
  }

  return (
    <div className="admin__container english__font">
      <div className="glass-card admin__main-card">
        <div className="admin__header">
          <h1>Admin Dashboard</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              onClick={toggleDarkMode}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </span>
            <Link to="/" className="admin__btn">Back to Portfolio</Link>
          </div>
        </div>

        <div className="admin__tabs">
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home Content
          </button>
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About Content
          </button>
          <button
            className={activeTab === "projects" ? "active" : ""}
            onClick={() => setActiveTab("projects")}
          >
            Projects Grid
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
            <button className="admin__btn primary large" onClick={saveData}>Save All Changes</button>
          )}
        </div>
      </div>
    </div>
  );
};
