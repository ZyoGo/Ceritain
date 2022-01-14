/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { MessageItem } from "./MessageItem";

export default function MessageContainer({ messages, userNickname }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [messages]);
  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      {messages.map((messageData, index) => (
        <MessageItem
          key={index}
          messageData={messageData}
          fromSender={userNickname === messageData.sender}
        />
      ))}
    </Box>
  );
}
