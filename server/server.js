import app from "./app.js";
import { Server } from "socket.io";
import messages from "./messages.js";

const server = new Server(
  app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  })
);

let sockets = [];

server.on(messages.CONNECTION, (socket) => {
  //User is connected, add to sockets array and log users
  socket.on(messages.USER_CONNECTED_SERVER, (username) => {
    sockets.push({ id: socket.id, username: username });
    server.emit(messages.USER_CONNECTED_CLIENT, username);
    sendActiveUsers();
    logActiveUsers();
  });

  //User sends a message, broadcast to all users
  socket.on(messages.MESSAGE_SERVER, (msg) => {
    console.log("chat message: " + msg);
    socket.broadcast.emit(messages.MESSAGE_CLIENT, msg);
  });

  //User disconnects, remove from sockets array and log users
  socket.on("disconnect", () => {
    sockets = sockets.filter((s) => s.id !== socket.id);
    console.log("user disconnected");
    sendActiveUsers();
    logActiveUsers();
  });
});

const logActiveUsers = () => sockets.length > 0 && console.table(sockets);

const sendActiveUsers = () =>  server.emit(messages.ACTIVE_USERS_TO_CLIENT, sockets);
