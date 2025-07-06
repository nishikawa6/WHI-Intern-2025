import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4a9eff",
    },
    secondary: {
      main: "#81d4d8",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(45deg, rgb(26, 35, 126), rgb(25, 118, 210))",
        },
      },
    },
  },
});
