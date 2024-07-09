/* eslint-disable react/prop-types */
import "./index.css";
import { useTranslation } from "react-i18next";

export const Header = (props) => {
	const { t } = useTranslation();
	return (
		<nav className="navbar">
			<a href="#">
				<img className="navbar-logo" src={props.logo} alt="logo" />
			</a>
			<div className="navbar__links">
				<a href="#about">{t("navbar-links.about-link")}</a>
				<a href="#projects">{t("navbar-links.projects-link")}</a>
				<a href="#contact">{t("navbar-links.contact-link")}</a>
			</div>
		</nav>
	);
};
