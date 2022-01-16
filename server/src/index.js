const dotenv = require("dotenv");
const { validators } = require("./core/validators");
const { listenerNames, emitNames } = require("./utils/constants");
const {
  getColorGenerator,
  createArrayOfUsersFromObject,
} = require("./utils/helpers");
dotenv.config();

const port = process.env.PORT || 5050;

// run the server
const io = require("socket.io")(port, {
  cors: {
    origins: process.env.CLIENT_URLS.split(","),
    methods: ["GET", "POST"],
  },
});

// Save the users in an object
const users = new Map();
const colorGen = getColorGenerator();

io.on("connection", (socket) => {
  // Get the user nickname from the query string
  const name = socket.handshake.query.userNickname;
  let errorMessage = "";
  try {
    // Validate the name, io, and users 
    for (const validator of validators) {
      validator({ io, socket, users });
    }
  } catch (error) {
    errorMessage = error.message;
  }
  // If there is an error, emit the error message
  if (errorMessage) {
    socket.emit(emitNames.ENTRY_ERROR, {
      errorMessage,
    });
    // setTimeout to disconnect the socket after 3 seconds
    setTimeout(() => socket?.disconnect(true), 3000);
  } else {
    socket.emit(emitNames.SUCCESS_CONNECTION);
    users.set(name, { color: colorGen.next().value });

    // emit the new user to all the users
    io.emit(emitNames.NEW_CLIENT, {
      user: name,
      users: createArrayOfUsersFromObject(Object.fromEntries(users)),
    });
    // emit the new message to all the users
    socket.broadcast.emit(emitNames.NEW_MESSAGE, {
      sender: name,
      message: "Has joined the chat",
      color: users.get(name).color,
    });

    // Listen for the send-message event
    socket.on(listenerNames.SEND_MESSAGE, (message) => {
      io.emit(emitNames.NEW_MESSAGE, {
        sender: name,
        message: message,
        color: users.get(name).color,
      });
    });

    // disconnect the user
    socket.on("disconnect", () => {
      socket.broadcast.emit(emitNames.NEW_MESSAGE, {
        sender: name,
        message: "Has left the chat",
        color: users.get(name).color,
      });
      users.delete(name);
      socket.broadcast.emit(emitNames.CLIENT_LEFT, {
        user: name,
        users: createArrayOfUsersFromObject(Object.fromEntries(users)),
      });
    });
  }
});

console.log(`Server running on port ${port}`);
