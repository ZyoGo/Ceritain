const { MAX_USERS } = require("../utils/constants");

function validateName({ io, socket, users } = {}) {
  const name = socket.handshake.query.userNickname;
  if (!/\w{2,15}$/.test(name)) {
    throw new Error("Invalid username");
  }
}

function validateUniqueName({ io, socket, users } = {}) {
  const name = socket.handshake.query.userNickname;
  if (users.has(name)) {
    throw new Error("The username is already taken");
  }
}

function validateMaxUsers({ io, socket, users } = {}) {
  if (io.engine.clientsCount > MAX_USERS) {
    throw new Error("The chat is full, wait until someone left chat");
  }
}

module.exports = {
  validators: [validateName, validateUniqueName, validateMaxUsers],
};
