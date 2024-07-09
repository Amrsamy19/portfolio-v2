/* eslint-disable react/prop-types */
//TODO: Fix dark mode on this part

import {
	BootstrapOriginal,
	Css3Original,
	ExpressOriginal,
	JavaOriginal,
	JavascriptOriginal,
	MaterialuiOriginal,
	MongodbOriginal,
	ReactOriginal,
	SassOriginal,
	TailwindcssOriginal,
	TypescriptOriginal,
	Html5Original,
	AmazonwebservicesOriginalWordmark,
} from "devicons-react";
import ProfilePic from "../../assets/me-about.jpg";
import "./index.css";
import { useTranslation } from "react-i18next";

const Technologies = (props) => {
	return (
		<div>
			<h2 className="skills__title">{props.title}</h2>
			<div className="skills__grid">
				<div className="skill__box">
					<ReactOriginal size={60} aria-label="React" />
					<label className="english__font">React</label>
				</div>
				<div className="skill__box">
					<JavascriptOriginal size={60} aria-label="Javascript" />
					<label className="english__font">Javascript</label>
				</div>
				<div className="skill__box">
					<TypescriptOriginal size={60} aria-label="Typescript" />
					<label className="english__font">Typescript</label>
				</div>
				<div className="skill__box">
					<Html5Original size={60} aria-label="Html" />
					<label className="english__font">Html</label>
				</div>
				<div className="skill__box">
					<Css3Original size={60} aria-label="Css" />
					<label className="english__font">Css</label>
				</div>
				<div className="skill__box">
					<TailwindcssOriginal size={60} aria-label="Tailwind CSS" />
					<label className="english__font">TailwindCss</label>
				</div>
				<div className="skill__box">
					<SassOriginal size={60} aria-label="Sass" />
					<label className="english__font">Sass</label>
				</div>
				<div className="skill__box">
					<BootstrapOriginal size={60} aria-label="Bootstrap" />
					<label className="english__font">Bootstrap</label>
				</div>
				<div className="skill__box">
					<MaterialuiOriginal size={60} aria-label="Material Ui" />
					<label className="english__font">Material Ui</label>
				</div>
				<div className="skill__box">
					<MongodbOriginal size={60} aria-label="Mongo Db" />
					<label className="english__font">Mongo Db</label>
				</div>
				<div className="skill__box">
					<ExpressOriginal size={60} aria-label="ExpressJs" />
					<label className="english__font">ExpressJS</label>
				</div>
				<div className="skill__box">
					<JavaOriginal size={60} aria-label="Java" />
					<label className="english__font">Java</label>
				</div>
				<div className="skill__box">
					<AmazonwebservicesOriginalWordmark size={60} aria-label="Java" />
					<label className="english__font">AWS</label>
				</div>
			</div>
		</div>
	);
};

export const About = () => {
	const { t } = useTranslation();
	return (
		<section id="about" className="about__section">
			<h2 className="about__title">{t("about.title")}</h2>
			<div className="about__grid">
				<img src={ProfilePic} alt="profile" />
				<div className="about__content">
					<p className="about__body-text">{t("about.description")}</p>
					<Technologies title={t("about.skills")} />
				</div>
			</div>
		</section>
	);
};
