"use client";
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close, GitHub } from "@mui/icons-material";

export const ProjectModal = ({ project, onClose, onNext, onPrev }) => {
  // Keyboard controls
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
