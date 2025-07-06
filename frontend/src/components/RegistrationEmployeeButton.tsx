import { Box, Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

export function RegisterationEmployeeButton() {
  return (
    <Link href="/employee/registration" style={{ textDecoration: "none" }}>
      <Card
        sx={{
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <AddIcon sx={{ width: 48, height: 48 }} />
            <Box display="flex" flexDirection="column">
              <Typography>新規登録</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
