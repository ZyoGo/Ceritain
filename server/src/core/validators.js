const { MAX_USERS } = require("../utils/constants");

function validateName({ socket } = {}) {
  // Get the user nickname from the query string
  const name = socket.handshake.query.userNickname;
  /** 
   *  Regex to validate the name of the username
   *  \w matches any word character (equivalent to [a-zA-Z0-9_])
   *  {2,15} matches the previous token between 2 and 15 times, as many times as possible, giving back as needed (greedy)
   *  $ asserts position at the end of the string, or before the line terminator right at the end of the string (if any)
  **/ 
  if (!/\w{2,15}$/.test(name)) {
    throw new Error("Invalid username");
  }
}

function validateUniqueName({ socket, users } = {}) {
  // Get the user nickname from the query string
  const name = socket.handshake.query.userNickname;
  // Check if the user already exists
  if (users.has(name)) {
    throw new Error("The username is already taken");
  }
}

function validateMaxUsers({ io } = {}) {
  // Check if the number of users is greater than the maximum allowed
  if (io.engine.clientsCount > MAX_USERS) {
    throw new Error("The chat is full, wait until someone left chat");
  }
}

module.exports = {
  validators: [validateName, validateUniqueName, validateMaxUsers],
};
