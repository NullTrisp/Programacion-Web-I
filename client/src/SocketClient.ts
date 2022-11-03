import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

class SocketClient {
    readonly socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    constructor() {
        this.socket = io("ws://localhost:4000");

        this.socket.on("user_connected_to_client", (user) => {
            console.log(`User connected: ${user}`);
        });
    }

    public emitMessage(username: string, message: string) {
        const msg = `${username}: ${message}`;
        this.socket.emit("msg_to_server", msg);
    }

    public connect(username: string) {
        this.socket.emit("user_connected_to_server", username);
    }
}

export default SocketClient;