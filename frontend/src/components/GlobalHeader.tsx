"use client";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { useThemeContext } from "../contexts/ThemeContext";

export interface GlobalHeaderProps {
  title: string;
  subtitle: string;
}

export function GlobalHeader({ title, subtitle }: GlobalHeaderProps) {
  const displayTitle = `${title} - ${subtitle}`;
  const { mode } = useThemeContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Link href="/">
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <Box sx={{ flexShrink: 0, mt: 1 }}>
                <Image
                  src="/dark_icon.png"
                  alt="App icon"
                  width={60}
                  height={40}
                  priority
                  unoptimized
                  style={{
                    filter:
                      mode === "light"
                        ? "brightness(1.1) contrast(0.9)"
                        : "none",
                    borderRadius: "4px",
                  }}
                />
              </Box>
            </Box>
          </Link>
          <Link href="/">
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              {displayTitle}
            </Typography>
          </Link>
          <ThemeToggleButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
