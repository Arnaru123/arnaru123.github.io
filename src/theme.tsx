import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface TypeText {
    lighter?: string;
  }
}

const primary = "#001d3d";
const secondary = "#edf2f4";
const light = "#457b9d";
const textPrimary = primary;
const textSecondary = "rgba(66, 82, 110, 0.86)";
const textLight = "#F4F5F7";

export const theme = createTheme({
  palette: {
    primary: {
      main: primary,
      light: light,
    },
    secondary: {
      main: secondary,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
      lighter: textLight,
    },
    background: {
      default: "#F4F5F7",
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
      fontSize: 35,
      letterSpacing: "-0.24px",
    },
    h2: {
      fontWeight: 500,
      fontSize: 29,
      letterSpacing: "-0.24px",
    },
    h3: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: "-0.06px",
    },
  },
});

export type Theme = typeof theme;
