import { useContext } from "react";
import { ThemeContext } from "../Theme";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Header } from "./components/Header";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import DARKLOGO from "./assets/dark-logo.svg";
import LIGHTLOGO from "./assets/light-logo.svg";
import { useTranslation } from "react-i18next";
import "./App.css";

export const App = () => {
	const { darkMode, toggleDarkMode } = useContext(ThemeContext);
	const { i18n } = useTranslation();

	return (
		<div
			className={`App ${darkMode ? "home__dark" : "home__light"} ${
				i18n.language === "ar" ? "arabic__font" : "english__font"
			}`}
		>
			<main>
				<Header logo={darkMode ? DARKLOGO : LIGHTLOGO} />
				<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
				<About />
				<Projects />
				<Contact darkMode={darkMode} />
			</main>
		</div>
	);
};
