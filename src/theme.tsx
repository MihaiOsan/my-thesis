import { createTheme, ThemeOptions } from "@mui/material/styles";

// Opțiuni comune pentru temă
const commonThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.75rem", fontWeight: 700 },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

// Tema Light
export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // albastru tipic
      contrastText: "#fff",
    },
    secondary: {
      main: "#9c27b0", // mov
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
});

// Tema Dark
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      contrastText: "#000",
    },
    secondary: {
      main: "#d1c4e9", // mov deschis
      contrastText: "#000",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
});
