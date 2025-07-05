import { Box } from "@mui/material";

export type VerticalSpacerProps = {
  height?: number;
};

export function VerticalSpacer(props: VerticalSpacerProps) {
  return <Box sx={{ height: props.height ?? 1 }} />;
}
