import { useState, useEffect } from "react";
import { LayoutGroup } from "framer-motion";
import "./index.css";
import { PROJECTS } from "./data";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIndex === null) return;

      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i + 1) % PROJECTS.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section id="projects" className="projects__section">
      <h2 className="projects__title">{t("projects.title")}</h2>

      <LayoutGroup>
        <div className="projects__grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onOpen={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {activeIndex !== null && (
          <ProjectModal
            project={PROJECTS[activeIndex]}
            onClose={() => setActiveIndex(null)}
            onNext={() => setActiveIndex((i) => (i + 1) % PROJECTS.length)}
            onPrev={() =>
              setActiveIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length)
            }
          />
        )}
      </LayoutGroup>
    </section>
  );
};
