"use client";

import i18n from "../i18next.js";
import { ThemeProvider } from "../Theme.jsx";
import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next";

export function Providers({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </I18nextProvider>
  );
}
