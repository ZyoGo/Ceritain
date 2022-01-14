const dotenv = require("dotenv");
const { validators } = require("./core/validators");
const { listenerNames, emitNames } = require("./utils/constants");
const {
  getColorGenerator,
  createArrayOfUsersFromObject,
} = require("./utils/helpers");
dotenv.config();

const port = process.env.PORT || 5050;

const io = require("socket.io")(port, {
  cors: {
    origins: process.env.CLIENT_URLS.split(","),
    methods: ["GET", "POST"],
  },
});

const users = new Map();
const colorGen = getColorGenerator();

io.on("connection", (socket) => {
  const name = socket.handshake.query.userNickname;
  let errorMessage = "";
  try {
    for (const validator of validators) {
      validator({ io, socket, users });
    }
  } catch (error) {
    errorMessage = error.message;
  }
  if (errorMessage) {
    socket.emit(emitNames.ENTRY_ERROR, {
      errorMessage,
    });
    setTimeout(() => socket?.disconnect(true), 3000);
  } else {
    socket.emit(emitNames.SUCCESS_CONNECTION);
    users.set(name, { color: colorGen.next().value });

    io.emit(emitNames.NEW_CLIENT, {
      user: name,
      users: createArrayOfUsersFromObject(Object.fromEntries(users)),
    });
    socket.broadcast.emit(emitNames.NEW_MESSAGE, {
      sender: name,
      message: "Has joined the chat",
      color: users.get(name).color,
    });

    socket.on(listenerNames.SEND_MESSAGE, (message) => {
      io.emit(emitNames.NEW_MESSAGE, {
        sender: name,
        message: message,
        color: users.get(name).color,
      });
    });

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
