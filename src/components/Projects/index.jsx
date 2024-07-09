import "./index.css";
import { PROJECTS } from "./data";
import { useTranslation } from "react-i18next";

export const Projects = () => {
	const { t } = useTranslation();
	return (
		<section id="projects" className="projects__section">
			<h2 className="projects__title">{t("projects.title")}</h2>
			<div className="projects__grid">
				{PROJECTS.map((project) => {
					return (
						<div key={project.title} className="project__content">
							<img src={project.imagePath} alt={project.title} />
							<p className="project__body__title english__font">
								{project.title}
							</p>
							<p className="english__font">{project.technologies.join(", ")}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};
