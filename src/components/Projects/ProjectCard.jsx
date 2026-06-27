"use client";
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import "./ProjectCard.css";

export const ProjectCard = ({ project, onOpen }) => {
  return (
    <motion.article
      layoutId={`card-${project.title}`}
      className="project__content"
      onClick={onOpen}
    >
      <div className="project__info">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__description">{project.description}</p>
        <p className="project__tech">{project.technologies.join(" • ")}</p>
      </div>
    </motion.article>
  );
};
