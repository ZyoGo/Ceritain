import React from "react";
import Box from "@mui/material/Box";
import { Lobby, ChatRoom } from "../pages";
import { useSocket } from "../providers/SocketProvider";

const BACKGROUND_IMAGE_URL = "https://source.unsplash.com/CdBPMI26KDo/1920x1280";

export default function AppSetup() {
  const { socketConnected } = useSocket();

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        backgroundImage: `url("${BACKGROUND_IMAGE_URL}")`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {socketConnected ? <ChatRoom /> : <Lobby />}
    </Box>
  );
}
