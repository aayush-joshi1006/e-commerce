import { createContext, useEffect, useState } from "react";

// create acontext for Theme
export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  // setting state for enabling dark mode
  const [darkMode, setDarkMode] = useState(() => {
    // Try to read saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;

    // If no saved preference, fallback to OS preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Update data-theme attribute on <html>
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );

    // Persist the preference
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    // creating Theme Context component to wrap around our code
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
