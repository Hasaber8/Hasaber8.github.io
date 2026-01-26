"use client";

import React, { useState, useEffect } from "react";
import { ThemeContext, Theme } from "./ThemeContextTypes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "themeData",
          JSON.stringify({
            theme: newTheme,
            timestamp: Date.now(),
          }),
        );
      }
      return newTheme;
    });
  };

  useEffect(() => {
    // init theme on client side to avoid hydration mismatch
    const initializeTheme = () => {
      let initialTheme: Theme = "dark"; // Default to dark for your preference

      if (typeof window !== "undefined") {
        // check manual theme preference within last week
        const savedThemeData = localStorage.getItem("themeData");
        if (savedThemeData) {
          try {
            const { theme: savedTheme, timestamp } = JSON.parse(savedThemeData);
            const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

            if (timestamp > oneWeekAgo) {
              initialTheme = savedTheme;
            } else {
              // Remove expired preference
              localStorage.removeItem("themeData");
              // Fall back to system preference
              initialTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            }
          } catch {
            // invalid data, remove it
            localStorage.removeItem("themeData");
            initialTheme = window.matchMedia("(prefers-color-scheme: dark)")
              .matches
              ? "dark"
              : "light";
          }
        } else {
          initialTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
        }
      }

      setTheme(initialTheme);
      setIsLoaded(true);
    };

    initializeTheme();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // apply theme to document root
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, isLoaded]);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    // listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // only update if no recent manual preference
      const savedThemeData = localStorage.getItem("themeData");
      if (savedThemeData) {
        try {
          const { timestamp } = JSON.parse(savedThemeData);
          const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

          if (timestamp > oneWeekAgo) {
            // manual preference still valid, don't update
            return;
          } else {
            // preference expired, remove and follow system
            localStorage.removeItem("themeData");
          }
        } catch {
          // invalid data, remove it
          localStorage.removeItem("themeData");
        }
      }

      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [isLoaded]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}
