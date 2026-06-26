import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (type) => {
    setLoading(true);
    try {
      const res = await fetch("/api/data", {
        headers: { "x-data-type": type },
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const saveData = async () => {
    setMessage("Saving...");
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeTab, content: data }),
      });
      if (res.ok) {
        setMessage("Saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
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

  // Render projects editor
  const renderProjects = () => {
    if (!data || !Array.isArray(data)) return null;
    return (
      <div className="admin__projects">
        {data.map((project, index) => (
          <div key={index} className="admin__project-card">
            <input
              type="text"
              value={project.title}
              onChange={(e) => {
                const newData = [...data];
                newData[index].title = e.target.value;
                setData(newData);
              }}
              placeholder="Title"
            />
            <textarea
              value={project.description}
              onChange={(e) => {
                const newData = [...data];
                newData[index].description = e.target.value;
                setData(newData);
              }}
              placeholder="Description"
            />
            <input
              type="text"
              value={project.technologies.join(", ")}
              onChange={(e) => {
                const newData = [...data];
                newData[index].technologies = e.target.value.split(",").map(t => t.trim());
                setData(newData);
              }}
              placeholder="Tech (comma separated)"
            />
            <input
              type="text"
              value={project.repo}
              onChange={(e) => {
                const newData = [...data];
                newData[index].repo = e.target.value;
                setData(newData);
              }}
              placeholder="Repo Link"
            />
            <div>
              <p>Image: {project.images[0]}</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleUploadImage(e.target.files[0], (path) => {
                      const newData = [...data];
                      newData[index].images = [path];
                      setData(newData);
                    });
                  }
                }}
              />
            </div>
            <button onClick={() => {
              const newData = data.filter((_, i) => i !== index);
              setData(newData);
            }}>Delete Project</button>
          </div>
        ))}
        <button className="admin__btn primary" onClick={() => {
          setData([...data, {
            id: Date.now().toString(),
            title: "New Project",
            description: "",
            technologies: [],
            repo: "",
            link: "",
            images: []
          }]);
        }}>+ Add Project</button>
      </div>
    );
  };

  // Render translations editor
  const renderTranslations = () => {
    if (!data) return null;
    
    // Simple recursive editor for JSON
    const renderObject = (obj, path = []) => {
      return Object.entries(obj).map(([key, value]) => {
        const currentPath = [...path, key];
        if (typeof value === 'object' && value !== null) {
          return (
            <div key={key} className="admin__json-group">
              <h4>{key}</h4>
              <div style={{ marginLeft: 20 }}>
                {renderObject(value, currentPath)}
              </div>
            </div>
          );
        }
        return (
          <div key={key} className="admin__json-field">
            <label>{key}</label>
            <textarea
              value={value}
              onChange={(e) => {
                const newData = JSON.parse(JSON.stringify(data));
                let target = newData;
                for (let i = 0; i < currentPath.length - 1; i++) {
                  target = target[currentPath[i]];
                }
                target[currentPath[currentPath.length - 1]] = e.target.value;
                setData(newData);
              }}
            />
          </div>
        );
      });
    };

    return <div className="admin__translations">{renderObject(data)}</div>;
  };

  return (
    <div className="admin__container english__font">
      <div className="admin__header">
        <h1>Local Admin Dashboard</h1>
        <Link to="/" className="admin__btn">Back to Portfolio</Link>
      </div>
      
      <div className="admin__tabs">
        <button 
          className={activeTab === "projects" ? "active" : ""} 
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button 
          className={activeTab === "en-translation" ? "active" : ""} 
          onClick={() => setActiveTab("en-translation")}
        >
          English Bio/Text
        </button>
        <button 
          className={activeTab === "ar-translation" ? "active" : ""} 
          onClick={() => setActiveTab("ar-translation")}
        >
          Arabic Bio/Text
        </button>
      </div>

      <div className="admin__content">
        {loading ? <p>Loading...</p> : (
          activeTab === "projects" ? renderProjects() : renderTranslations()
        )}
      </div>

      <div className="admin__footer">
        {message && <span className="admin__message">{message}</span>}
        <button className="admin__btn primary" onClick={saveData}>Save Changes</button>
      </div>
    </div>
  );
};
