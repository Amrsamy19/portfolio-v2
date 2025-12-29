import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "./ProjectCard.css";

export const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = project.images || [project.imagePath];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="project__content">
      <div className="project__image-container">
        <img
          src={images[currentImageIndex]}
          alt={project.title}
          className="project__image"
        />

        {images.length > 1 && (
          <>
            <button
              className="project__nav-btn project__nav-btn--prev"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>
            <button
              className="project__nav-btn project__nav-btn--next"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight />
            </button>

            <div className="project__dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`project__dot ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="project__info">
        <p className="project__body__title english__font">{project.title}</p>
        <p className="project__tech english__font">
          {project.technologies.join(", ")}
        </p>
      </div>
    </div>
  );
};
