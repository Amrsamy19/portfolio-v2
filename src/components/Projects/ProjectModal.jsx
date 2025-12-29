import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";

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

  // 🎯 Keyboard controls
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [imageIndex]); // Include imageIndex in dependencies

  // Prevent body scroll when modal is open
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
        transition={{ duration: 0.3 }}
      >
        <motion.div
          layoutId={`card-${project.title}`}
          className="modal__content"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Image Carousel */}
          <div className="modal__image-container">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={imageIndex}
                src={images[imageIndex]}
                alt={`${project.title} - Image ${imageIndex + 1}`}
                className="modal__image"
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) paginate(1);
                  else if (swipe > 10000) paginate(-1);
                }}
              />
            </AnimatePresence>

            {/* Image Counter */}
            {images.length > 1 && (
              <motion.div
                className="modal__counter"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {imageIndex + 1} / {images.length}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <motion.button
                  className="modal__nav prev"
                  onClick={prevImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft />
                </motion.button>
                <motion.button
                  className="modal__nav next"
                  onClick={nextImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight />
                </motion.button>
              </>
            )}
          </div>

          {/* Close Button */}
          <motion.button
            className="modal__close"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <Close />
          </motion.button>

          {/* Project Details */}
          <motion.div
            className="modal__details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="modal__tech-tags">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Project Navigation Hint */}
          <motion.div
            className="modal__nav-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Add onClick and change to a clickable element or button */}
            <span onClick={onPrev} style={{ cursor: "pointer" }}>
              ← Previous Project
            </span>

            <span onClick={onNext} style={{ cursor: "pointer" }}>
              Next Project →
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
