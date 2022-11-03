import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { io } from "socket.io-client";
import { changeSala } from '../store/salaSlice';

interface ActiveUsers {
    id: string,
    username: string
};

function Chat() {

    const [messages, setmessages] = useState(Array<string>());
    const [message, setmessage] = useState("");
    const [activeUsers, setactiveUsers] = useState(Array<ActiveUsers>());
    const dispatch = useAppDispatch()

    const usernameFromStore = useAppSelector(state => state.user.value)

    const socketClient = io("ws://localhost:4000");

    useEffect(() => {
        socketClient.emit("user_connected_to_server", usernameFromStore);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    socketClient.on("msg_to_client", (message: string) => {
        setmessages([...messages, message]);
    });

    socketClient.on("active_users_to_client", (users: Array<ActiveUsers>) => {
        setactiveUsers(users);
    });

    socketClient.on("user_connected_to_client", (username: string) => {
        setmessages([...messages, `${username} has connected`]);
    })

    const emitMessage = (username: string, message: string) => {
        const msg = `${username}: ${message}`;
        socketClient.emit("msg_to_server", msg);
    }

    const appendMessage = (ev: React.MouseEvent) => {
        ev.preventDefault();
        const messageToEmitt = `${usernameFromStore}: ${message}`;
        emitMessage(usernameFromStore, messageToEmitt);
        setmessages([...messages, messageToEmitt]);
        setmessage("");
    }
    return (
        <div>
            <h2>Active users</h2>
            <ul className="users-list">
                {activeUsers.map(({ username }, index) => <li key={index} onClick={() => { dispatch(changeSala(username)); setmessages([]) }}>{username}</li>)}
            </ul>
            <hr />
            <ul id="messages">
                {messages.map((message, index) => <li key={index}>{message}</li>)}
            </ul>
            <form id="form" action="">
                <input type="text" value={message} onChange={(ev) => setmessage(ev.target.value)} />
                <button onClick={appendMessage}>Send</button>
            </form>
        </div>);
}

export default Chat;