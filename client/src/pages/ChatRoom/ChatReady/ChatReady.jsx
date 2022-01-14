import React, { useEffect, useState } from "react";
import { MessageContainer } from "../MessageContainer";
import { InputContainer } from "../InputContainer";
import { listenerNames } from "../../../utils/constants";
import { useSocket } from "../../../providers/SocketProvider";

export default function ChatReady() {
  const { socket, userNickname } = useSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket == null) return undefined;

    socket.on(listenerNames.NEW_MESSAGE, (data) => {
      setMessages((oldMessages) => [...oldMessages, data]);
    });

    return () => socket.off(listenerNames.NEW_MESSAGE);
  }, [socket]);
  return (
    <>
      <MessageContainer messages={messages} userNickname={userNickname} />
      <InputContainer />
    </>
  );
}
