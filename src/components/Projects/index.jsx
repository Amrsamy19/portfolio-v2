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

  useEffect(() => {
    fetch('/api/data?type=projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error);
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
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || project.title || index}
              project={project}
              index={index}
              onOpen={() => setActiveIndex(index)}
            />
          ))}
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
