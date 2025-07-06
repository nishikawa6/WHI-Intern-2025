"use client";

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../contexts/ThemeContext";

export const ThemeToggleButton: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip
      title={
        mode === "light" ? "ダークモードに切り替え" : "ライトモードに切り替え"
      }
    >
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="テーマを切り替え"
        sx={{
          ml: 1,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};
