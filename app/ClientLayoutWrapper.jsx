/* eslint-disable react/prop-types */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Theme";
import { useTranslation } from "react-i18next";

export function ClientLayoutWrapper({ children }) {
  const { darkMode } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent flash of unstyled content during SSR mismatch
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  const themeClass = darkMode ? "home__dark" : "home__light";
  const langClass = i18n.language === "ar" ? "arabic__font" : "english__font";

  return (
    <div className={`App ${themeClass} ${langClass}`}>
      <React.Suspense fallback={<div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white"}}>Loading...</div>}>
        {children}
      </React.Suspense>
    </div>
  );
}
