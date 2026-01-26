import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLoaded: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
