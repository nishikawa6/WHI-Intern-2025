import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#005bac",
    },
    secondary: {
      main: "#5ec2c6",
    },
    background: {
      default: "#f0f0f0",
      paper: "#ffffff",
    },
    text: {
      primary: "#171717",
      secondary: "#666666",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(45deg, rgb(0, 91, 172), rgb(94, 194, 198))",
        },
      },
    },
  },
});
