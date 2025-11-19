import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "light", // thème par défaut
  toggleTheme: () => {}, // fonction vide (sera remplacée dans le provider)
});
