import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
/* Added GitHub to the imports below */
import { ChevronLeft, ChevronRight, Close, GitHub } from "@mui/icons-material";

export const ProjectModal = ({ project, onClose, onNext, onPrev }) => {
  const [[imageIndex, direction], setImageIndex] = useState([0, 0]);
  const images = project.images;

  const paginate = (newDirection) => {
    setImageIndex(([prev]) => [
      (prev + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  const nextImage = () => paginate(1);
  const prevImage = () => paginate(-1);

  // Keyboard controls
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [imageIndex, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="modal__backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          layoutId={`card-${project.title}`}
          className="modal__content"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Image Carousel */}
          <div className="modal__image-container">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={imageIndex}
                src={images[imageIndex]}
                alt={`${project.title}`}
                className="modal__image"
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
              />
            </AnimatePresence>

            {images.length > 1 && (
              <div className="modal__counter">
                {imageIndex + 1} / {images.length}
              </div>
            )}

            {images.length > 1 && (
              <>
                <button className="modal__nav prev" onClick={prevImage}>
                  <ChevronLeft />
                </button>
                <button className="modal__nav next" onClick={nextImage}>
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          <button className="modal__close" onClick={onClose}>
            <Close />
          </button>

          <div className="modal__details">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div>
              <div className="modal__tech-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              {/* Link Section */}
              <div className="modal__links" style={{ marginTop: "1.5rem" }}>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub sx={{ fontSize: 30, color: "#db6db8" }} />
                </a>
              </div>
            </div>
          </div>

          <div className="modal__nav-hint">
            <span onClick={onPrev} style={{ cursor: "pointer" }}>
              ← Previous Project
            </span>
            <span onClick={onNext} style={{ cursor: "pointer" }}>
              Next Project →
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
