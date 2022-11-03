import app from "./app.js";
import { Server } from "socket.io";
import messages from "./messages.js";

const server = new Server(
  app.listen(4000, () => {
    console.log(`Server running on port 4000`);
  }), {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let sockets = [];

server.on(messages.CONNECTION, (socket) => {
  //User is connected, add to sockets array and log users
  socket.on(messages.USER_CONNECTED_SERVER, (username) => {
    if (!sockets.find((socketFound) => socketFound.id === socket.id)) {
      sockets.push({ id: socket.id, username: username });
      server.emit(messages.USER_CONNECTED_CLIENT, username);
      logActiveUsers();
      sendActiveUsers();
    }
  });

  //User sends a message, broadcast to all users
  socket.on(messages.MESSAGE_SERVER, (msg) => {
    console.log("chat message: " + msg);
    socket.broadcast.emit(messages.MESSAGE_CLIENT, msg);
  });

  socket.on("private_message_to_server", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });
  //User disconnects, remove from sockets array and log users
  socket.on("disconnect", () => {
    if (sockets.find((socketFound) => socketFound.id === socket.id)) {
      sockets = sockets.filter((s) => s.id !== socket.id);
      console.log("user disconnected");
      sendActiveUsers();
      logActiveUsers();
    }
  });
});

const logActiveUsers = () => sockets.length > 0 && console.table(sockets);

const sendActiveUsers = () => server.emit(messages.ACTIVE_USERS_TO_CLIENT, sockets);
