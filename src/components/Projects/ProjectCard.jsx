import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "./ProjectCard.css";

const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export const ProjectCard = ({ project, onOpen }) => {
  const [[imageIndex, direction], setImageIndex] = useState([0, 0]);
  const images = project.images;

  const paginate = (newDirection) => {
    setImageIndex(([prev]) => [
      (prev + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <motion.article
      layoutId={`card-${project.title}`}
      className="project__content"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Image preview */}
      <div className="project__carousel">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={imageIndex}
            src={images[imageIndex]}
            alt={`${project.title} preview`}
            className="project__image"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) paginate(1);
              if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              className="project__nav-btn prev"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
            >
              <ChevronLeft />
            </button>

            <button
              className="project__nav-btn next"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div className="project__info">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__description">{project.description}</p>
        <p className="project__tech">{project.technologies.join(" • ")}</p>
      </div>
    </motion.article>
  );
};
