import { useContext, createContext } from "react";

export const themeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

export default function useTheme() {
  return useContext(themeContext);
}
