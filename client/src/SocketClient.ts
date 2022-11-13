import { io } from "socket.io-client";
import { store } from "./store";
import { pushMessage } from "./store/messagesSlice";
import { addUser } from "./store/userSlice";
import { User } from "./types/User";

const dispatch = store.dispatch;
export default class SocketClient {
    readonly socket;
    constructor() {
        this.socket = io("ws://localhost:4000");

        this.socket.on("msg_to_client", (message: string) => {
            window.scrollTo(0, document.body.scrollHeight);
            dispatch(pushMessage(message));
        });

        this.socket.on("user_connected_to_client", ({ username, id }: User) => {
            dispatch(pushMessage(`${username} has connected`));
        });

        this.socket.on("user_connected_to_client_return_user", ({ username, id }: User) => {
            dispatch(addUser({ username, id }));
        });

        this.socket.on("private_message_to_user", (message: string) => {
            window.scrollTo(0, document.body.scrollHeight);
            dispatch(pushMessage(message));
        });

        if (store.getState().user.username !== "") {
            this.socket.emit("user_connected_to_server", store.getState().user.username);
            dispatch(pushMessage(`You have connected`));
        }

        this.socket.on("user_disconnected_to_client", ({ username }: User) => {
            dispatch(pushMessage(`${username} has disconnected`));
        });
    }
}