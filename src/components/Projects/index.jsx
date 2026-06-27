"use client";
import { useState, useEffect } from "react";
import { LayoutGroup } from "framer-motion";
import "./index.css";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data?type=projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIndex === null || projects.length === 0) return;

      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i + 1) % projects.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, projects]);

  return (
    <section id="projects" className="projects__section">
      <h2 className="projects__title">{t("projects.title")}</h2>

      <LayoutGroup>
        <div className="projects__grid">
          {loading ? (
             <p style={{ textAlign: "center", width: "100%", color: "#db6db8", fontSize: "1.2rem", padding: "2rem 0" }}>
               Loading...
             </p>
          ) : projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard
                key={project.id || project.title || index}
                project={project}
                index={index}
                onOpen={() => setActiveIndex(index)}
              />
            ))
          ) : (
             <p style={{ textAlign: "center", width: "100%", color: "#b0b0b0", fontStyle: "italic", fontSize: "1.2rem", padding: "2rem 0" }}>
               No projects added yet.
             </p>
          )}
        </div>

        {activeIndex !== null && projects[activeIndex] && (
          <ProjectModal
            project={projects[activeIndex]}
            onClose={() => setActiveIndex(null)}
            onNext={() => setActiveIndex((i) => (i + 1) % projects.length)}
            onPrev={() =>
              setActiveIndex((i) => (i - 1 + projects.length) % projects.length)
            }
          />
        )}
      </LayoutGroup>
    </section>
  );
};
