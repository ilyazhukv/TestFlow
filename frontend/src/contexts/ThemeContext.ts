import { createContext } from "react";

export interface IThemeContext {
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  toggleTheme: () => {},
});