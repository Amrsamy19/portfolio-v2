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
			"Dashboard built with React and Tailwind where Integrated with Auth0 Authentication, implemented client-side CRUD operations with the Fetch API & made client-side routing using React-Router.",
		technologies: ["React", "React-Router", "Tailwind", "i18next", "Auth0"],
		repo: "https://github.com/Amrsamy19/plastikat-dashboard",
		link: "",
		imagePath: PLASTIKAT,
	},
	{
		title: "movieflix",
		description:
			"A web app for displaying movie data built with React, TypeScript, Tailwind where I can display movie details (Name, Rating, Genres, Overview), display top trending movies & search for a movie",
		technologies: ["React", "React-Router", "TypeScript", "Tailwind"],
		repo: "https://github.com/Amrsamy19/movieflix",
		link: "https://movieflix-c73c89.netlify.app/home",
		imagePath: MOVIEFLIX,
	},
	{
		title: "FWD-CROSS-SKILLING-REACT",
		description:
			"A bookshelf app built with ReactJS where search for books & categorization of books you have read, currently reading, or want to read",
		technologies: ["React", "React-Router"],
		repo: "https://github.com/Amrsamy19/FWD-CROSS-SKILLING-REACT",
		link: "https://myreads-ba9fdd.netlify.app/",
		imagePath: MYREADS,
	},
	{
		title: "color-palette-generator",
		description:
			"A web app for generating a color palette built with React where it generates a random colors where it can be copied",
		technologies: ["React", "react-toastify"],
		repo: "https://github.com/Amrsamy19/palette-generator",
		link: "",
		imagePath: COLOR,
	},
	{
		title: "advice-generator",
		description:
			"A web app for generating advices built with React where it generates an advices.",
		technologies: ["Preact"],
		repo: "https://github.com/Amrsamy19/advice-generator",
		link: "https://advicey-generator.netlify.app/",
		imagePath: ADVICE,
	},
	{
		title: "todo-react-aws",
		description: "A todo web app built with React.",
		technologies: ["React", "Typescript", "Material Ui", "AWS"],
		repo: "https://github.com/Amrsamy19/todo-react-aws",
		link: "https://dodoy.netlify.app/login",
		imagePath: TODO,
	},
];
