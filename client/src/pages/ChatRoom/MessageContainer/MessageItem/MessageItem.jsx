import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function MessageItem({ messageData, fromSender }) {
  const extraStyles = fromSender ? { alignSelf: "flex-end" } : {};

  return (
    <Box
      sx={{
        maxWidth: { xs: 260, sm: 400, md: 500 },
        width: "fit-content",
        minWidth: 200,
        backgroundColor: "background.paper",
        p: 1.2,
        m: 1,
        borderRadius: 2,
        ...extraStyles,
      }}
      component={Paper}
      elevation={1}
    >
      <Typography fontWeight={700} variant="body1" sx={{ color: messageData.color }}>
        {messageData.sender}
      </Typography>
      <Typography variant="body2" sx={{ overflowWrap: "break-word" }}>
        {messageData.message}
      </Typography>
    </Box>
  );
}
