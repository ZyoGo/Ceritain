const MAX_USERS = 50;

const listenerNames = {
  SEND_MESSAGE: "send-message",
};

const emitNames = {
  SUCCESS_CONNECTION: "success-connection",
  ENTRY_ERROR: "entry-error",
  NEW_MESSAGE: "new-message",
  NEW_CLIENT: "new-client",
  CLIENT_LEFT: "client-left",
};

module.exports = {
  listenerNames,
  emitNames,
  MAX_USERS,
};
