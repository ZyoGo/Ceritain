import React, { useState } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { alpha } from "@mui/material/styles";
import { ChatReady } from "./ChatReady";
import OnlineUsersModal from "./OnlineUsersModal/OnlineUsersModal";

export default function ChatRoom() {
  const [usersModal, setUsersModal] = useState(false);

  return (
    <>
      <OnlineUsersModal open={usersModal} onClose={() => setUsersModal(false)} />
      <Box
        elevation={1}
        sx={{
          maxWidth: 1200,
          width: { xs: "100vw", sm: "95vw" },
          height: { xs: "100vh", sm: "90vh" },
          display: "flex",
          flexDirection: "column",
          borderRadius: (theme) => theme.spacing(1.5),
          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
        }}
        component={Paper}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 0,
            borderTopRightRadius: "inherit",
            borderTopLeftRadius: "inherit",
          }}
          elevation={2}
          component={Paper}
        >
          <Typography sx={{ fontWeight: 700 }} variant="h5" component="h5">
            Chat
          </Typography>
          <IconButton
            aria-label="list-online-users"
            onClick={() => setUsersModal(true)}
          >
            <ListIcon sx={{ color: "primary.contrastText" }} />
          </IconButton>
        </Box>
        <ChatReady />
      </Box>
    </>
  );
}
