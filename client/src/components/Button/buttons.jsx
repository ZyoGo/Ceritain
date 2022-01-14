import React from "react";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

export function CircularButton({ children, color = "primary", onClick = () => {} }) {
  return (
    <Fab size="small" color={color} sx={{ boxShadow: "none" }} onClick={onClick}>
      {children}
    </Fab>
  );
}
