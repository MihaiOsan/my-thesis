// src/theme.ts

import { createTheme } from "@mui/material/styles";

// Tema Light
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // un albastru tipic
    },
    secondary: {
      main: "#9c27b0", // mov
    },
  },
  // Poți extinde cu tipografie, breakpoints, shape, etc.
});

// Tema Dark
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});
