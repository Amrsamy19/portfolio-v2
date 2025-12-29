import { useState } from "react";
import "./index.css";
import { PROJECTS } from "./data";
import { ProjectCard } from "./ProjectCard";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export const Projects = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="projects" className="projects__section">
      <h2 className="projects__title">{t("projects.title")}</h2>

      <div className="projects__carousel-container">
        <button
          className="carousel__nav-btn carousel__nav-btn--prev"
          onClick={prevSlide}
          aria-label="Previous project"
        >
          <ChevronLeft sx={{ fontSize: 32 }} />
        </button>

        <div className="projects__carousel">
          <div
            className="projects__carousel-track"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {PROJECTS.map((project, index) => (
              <div key={project.title} className="projects__carousel-slide">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel__nav-btn carousel__nav-btn--next"
          onClick={nextSlide}
          aria-label="Next project"
        >
          <ChevronRight sx={{ fontSize: 32 }} />
        </button>
      </div>

      <div className="carousel__indicators">
        {PROJECTS.map((_, index) => (
          <button
            key={index}
            className={`carousel__indicator ${
              index === currentSlide ? "active" : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
