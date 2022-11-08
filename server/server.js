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
      socket.broadcast.emit(messages.USER_CONNECTED_CLIENT, { id: socket.id, username: username });
      server.to(socket.id).emit("user_connected_to_client_return_user", { id: socket.id, username: username });
      logActiveUsers();
      sendActiveUsers();
    }
  });

  //User sends a message, broadcast to all users
  socket.on(messages.MESSAGE_SERVER, (msg) => {
    console.log("chat message: " + msg);
    socket.broadcast.emit(messages.MESSAGE_CLIENT, msg);
  });

  //Private message (whisper)
  socket.on("private_message_to_server", ({ content, to }) => {
    console.log("private message: " + content);
    socket.to(to).emit("private_message_to_user", content);
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
