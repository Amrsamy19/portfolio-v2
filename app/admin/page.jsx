"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../Theme";
import { AdminDashboard } from "../../src/components/Admin";

export default function AdminPage() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  );
}
