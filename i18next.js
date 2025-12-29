import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Arabic from "./src/translation/ar-translation.json";
import English from "./src/translation/en-translation.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			ar: {
				translation: Arabic,
			},
			en: {
				translation: English,
			},
		},
	});

export default i18n;
