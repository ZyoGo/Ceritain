import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userNickname) return undefined;

    setLoading(true);
    const newSocket = io(process.env.REACT_APP_CHAT_WEBSOCKET_SERVER, {
      query: { userNickname },
    });

    newSocket.on("entry-error", (data) => {
      setErrorMessage(data.errorMessage);
      setLoading(false);
    });

    // real connection without errorS
    newSocket.on("success-connection", () => {
      setSocket(newSocket);
      setSocketConnected(true);
      setLoading(false);
    });
    newSocket.on("disconnect", () => {
      setSocketConnected(false);
      setLoading(false);
    });

    return () => {
      newSocket.close();
      newSocket.off("connect");
      newSocket.off("disconnect");
      newSocket.off("entry-error");
    };
  }, [userNickname]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        userNickname,
        socketConnected,
        setUserNickname,
        loading,
        errorMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
