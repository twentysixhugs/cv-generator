import { styled, Grid, Typography, Box } from "@mui/material";

export const StyledGrid = styled(Grid)({
  display: "flex",
  position: "relative",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#fff",
  fontSize: "0.875em",
});

export const StyledTypography = styled(Typography)({
  padding: "0 1.546875em 0 0.5rem",
  "&:hover": {
    color: "#1890FF",
  },
});

export const StyledBox = styled(Box)({
  display: "flex",
  cursor: "pointer",
});
