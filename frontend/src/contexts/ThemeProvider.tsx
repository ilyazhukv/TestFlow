import { useState, type ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, type PaletteMode } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import { theme } from "../theme/theme";

const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("theme");
    return (savedMode as PaletteMode) || "dark";
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  const currentTheme = theme(mode);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MuiThemeProvider theme={currentTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeModeProvider;