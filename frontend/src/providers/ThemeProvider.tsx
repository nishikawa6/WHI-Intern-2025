"use client";

import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  ThemeContextProvider,
  useThemeContext,
} from "../contexts/ThemeContext";
import { lightTheme, darkTheme } from "../themes";

interface ThemeProviderInnerProps {
  children: React.ReactNode;
}

const ThemeProviderInner: React.FC<ThemeProviderInnerProps> = ({
  children,
}) => {
  const { mode } = useThemeContext();
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </ThemeContextProvider>
  );
};
