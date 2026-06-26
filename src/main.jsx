import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import i18n from "../i18next.js";
import { App } from "./App.jsx";
import { ThemeProvider } from "../Theme.jsx";
import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<ThemeProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
				<ToastContainer />
			</ThemeProvider>
		</I18nextProvider>
	</React.StrictMode>
);
