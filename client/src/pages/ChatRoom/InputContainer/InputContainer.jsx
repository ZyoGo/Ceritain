import React, { useEffect, useRef, useCallback } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, TextareaAutosize } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { emitNames } from "../../../utils/constants";
import { useSocket } from "../../../providers/SocketProvider";
import { CircularButton } from "../../../components/Button/buttons";

export default function InputContainer() {
  const { socket } = useSocket();
  const theme = useTheme();
  const textAreaRef = useRef(null);

  const sendMessage = useCallback(() => {
    const message = textAreaRef.current.value;
    if (message) {
      socket.emit(emitNames.SEND_MESSAGE, message);
    }
    textAreaRef.current.value = "";
  }, [socket]);

  const handleSendMessage = useCallback(
    (e) => {
      if (e.key === "Enter") {
        sendMessage();
        e.preventDefault();
      }
    },
    [sendMessage]
  );

  useEffect(() => {
    const tArea = textAreaRef.current;
    tArea.addEventListener("keypress", handleSendMessage);
    return () => {
      tArea.removeEventListener("keypress", handleSendMessage);
    };
  }, [handleSendMessage]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "primary.light",
        py: 1,
        px: 2,
        borderBottomRightRadius: "inherit",
        borderBottomLeftRadius: "inherit",
      }}
    >
      <TextareaAutosize
        placeholder="Write a message"
        ref={textAreaRef}
        style={{
          width: "95%",
          flexGrow: 1,
          padding: theme.spacing(1.5),
          marginRight: theme.spacing(1.5),
          borderRadius: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          fontFamily: theme.typography.fontFamily,
          outline: 0,
        }}
      />
      <CircularButton onClick={sendMessage}>
        <SendIcon />
      </CircularButton>
    </Box>
  );
}
