import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function ChatLoading() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row-reverse",
        },
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          mb: { xs: 4, sm: 0 },
          fontSize: { xs: "1.8rem", sm: "2.125rem" },
        }}
        variant="h4"
        component="h4"
        textAlign="center"
      >
        Connecting to the server...
      </Typography>
      <CircularProgress color="primary" sx={{ mr: { xs: 0, sm: 3 } }} />
    </Box>
  );
}
