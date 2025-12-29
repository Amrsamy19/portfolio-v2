import PLASTIKAT from "../../assets/plastikat.png";
import MOVIEFLIX from "../../assets/movieflix.png";
import MYREADS from "../../assets/myreads.png";
import ADVICE from "../../assets/advice.png";
import TODO from "../../assets/todo.png";
import COLOR from "../../assets/color.png";

export const PROJECTS = [
  {
    title: "plastikat-dashboard",
    description:
      "A dashboard built with React and Tailwind, integrated with Auth0 authentication, featuring client-side CRUD operations and routing.",
    technologies: ["React", "React-Router", "Tailwind", "i18next", "Auth0"],
    repo: "https://github.com/Amrsamy19/plastikat-dashboard",
    link: "",
    images: [PLASTIKAT],
  },
  {
    title: "movieflix",
    description:
      "A movie discovery app built with React and TypeScript. Browse trending movies, view details, and search dynamically.",
    technologies: ["React", "React-Router", "TypeScript", "Tailwind"],
    repo: "https://github.com/Amrsamy19/movieflix",
    link: "https://movieflix-c73c89.netlify.app/home",
    images: [MOVIEFLIX],
  },
  {
    title: "FWD-CROSS-SKILLING-REACT",
    description:
      "A bookshelf application where users can search for books and categorize them into reading states.",
    technologies: ["React", "React-Router"],
    repo: "https://github.com/Amrsamy19/FWD-CROSS-SKILLING-REACT",
    link: "https://myreads-ba9fdd.netlify.app/",
    images: [MYREADS],
  },
  {
    title: "color-palette-generator",
    description:
      "A color palette generator that creates random color schemes and allows easy copying.",
    technologies: ["React", "react-toastify"],
    repo: "https://github.com/Amrsamy19/palette-generator",
    link: "",
    images: [COLOR],
  },
  {
    title: "advice-generator",
    description:
      "A simple app that fetches and displays random advice using an external API.",
    technologies: ["Preact"],
    repo: "https://github.com/Amrsamy19/advice-generator",
    link: "https://advicey-generator.netlify.app/",
    images: [ADVICE],
  },
  {
    title: "todo-react-aws",
    description:
      "A full-stack todo application using React and AWS services with authentication.",
    technologies: ["React", "Typescript", "Material UI", "AWS"],
    repo: "https://github.com/Amrsamy19/todo-react-aws",
    link: "https://dodoy.netlify.app/login",
    images: [TODO],
  },
];
