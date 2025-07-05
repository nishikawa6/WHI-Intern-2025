import { Box, Button, Paper } from "@mui/material";
import Image from "next/image";

export function GlobalFooter() {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        justifyContent: "center",
        display: "flex",
        gap: 4,
        px: 8,
        py: 1,
      }}
    >
      <Button
        variant="text"
        href="https://www.career.works-hi.co.jp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box sx={{ flexShrink: 0 }}>
          <Image
            src="/logo.png"
            alt="WHI logo"
            width={1160 / 5}
            height={168 / 5}
            priority
            unoptimized
          />
        </Box>
      </Button>

      <Button
        variant="outlined"
        href="https://www.career.works-hi.co.jp/job/intership/"
        target="_blank"
        rel="noopener noreferrer"
      >
        インターンシップ
      </Button>

      <Button
        variant="outlined"
        href="https://www.career.works-hi.co.jp/beginners/tech/"
        target="_blank"
        rel="noopener noreferrer"
      >
        エンジニア採用
      </Button>
    </Paper>
  );
}
