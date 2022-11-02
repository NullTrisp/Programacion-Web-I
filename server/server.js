import app from "./app.js";
import { Server } from "socket.io";

const server = app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

const io = new Server(server);
let sockets = [];

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    sockets = sockets.filter((s) => s.id !== socket.id);
    console.log("user disconnected");
    logActiveUsers(sockets);
  });

  socket.on("msg_to_server", (msg) => {
    console.log("chat message: " + msg);
    io.emit("msg_to_client", msg);
  });

  socket.on("user_connected_to_server", (username) => {
    sockets.push({ id: socket.id, username: username });
    io.emit("user_connected_to_client", username);
    console.log("user connected: " + username);
    logActiveUsers(sockets);
  });
});

const logActiveUsers = (sockets) => {
  console.table(sockets);
};
