import { useEffect, useState } from "react";
import { listenerNames } from "../../../utils/constants";

export function useChatUsers({ socket, onNewUser = () => {}, onUserLeft = () => {} }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (socket == null) return undefined;

    socket.on(listenerNames.NEW_CLIENT, (data) => {
      setUsers(data.users);
      onNewUser(data.user);
    });

    socket.on(listenerNames.CLIENT_LEFT, (data) => {
      setUsers(data.users);
      onUserLeft(data.user);
    });

    return () => {
      socket.off(listenerNames.NEW_CLIENT);
      socket.off(listenerNames.CLIENT_LEFT);
    };
  }, [socket, onNewUser, onUserLeft]);

  return { users };
}
