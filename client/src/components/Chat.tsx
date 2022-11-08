import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { io } from "socket.io-client";
import { changeSala } from '../store/salaSlice';
import { add } from '../store/userSlice';

export interface User {
    id: string,
    username: string
};

function Chat() {

    const [messages, setmessages] = useState(Array<string>());
    const [message, setmessage] = useState("");
    const [activeUsers, setactiveUsers] = useState(Array<User>());
    const dispatch = useAppDispatch()

    const userFromStore = useAppSelector(state => state.user)
    const salaFromStore = useAppSelector(state => state.sala)

    const socketClient = io("ws://localhost:4000");

    useEffect(() => {
        socketClient.emit("user_connected_to_server", userFromStore.username);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    socketClient.on("msg_to_client", (message: string) => {
        window.scrollTo(0, document.body.scrollHeight);
        setmessages([...messages, message]);
    });

    socketClient.on("active_users_to_client", (users: Array<User>) => {
        setactiveUsers(users);
    });

    socketClient.on("user_connected_to_client", ({ username, id }: User) => {
        setmessages([...messages, `${username} has connected`]);
    })

    socketClient.on("user_connected_to_client_return_user", ({ username, id }: User) => {
        dispatch(add({ username, id }));
    });

    socketClient.on("private_message_to_user", (message: string) => {
        window.scrollTo(0, document.body.scrollHeight);
        setmessages((state) => [...state, message]);
    })

    const appendMessage = (ev: React.MouseEvent) => {
        window.scrollTo(0, document.body.scrollHeight);
        ev.preventDefault();
        if (salaFromStore.name === "general") {
            const messageToEmitt = `${userFromStore.username}: ${message}`;
            setmessages([...messages, messageToEmitt]);
            socketClient.emit("msg_to_server", messageToEmitt);
        } else {
            const messageToEmitt = `Private message from ${userFromStore.username}: ${message}`;
            setmessages([...messages, messageToEmitt]);
            socketClient.emit("private_message_to_server", { to: activeUsers.find(user => user.id === salaFromStore.id)?.id, content: messageToEmitt });
        }
        setmessage("");
    }

    const handleChatChange = ({ username, id }: User) => {
        dispatch(changeSala({ name: username, id }));
    }

    return (
        <div>
            <h2>Active users</h2>
            <div className="users-list">
                {activeUsers.map(({ username, id }, index) => <p key={index} onClick={() => handleChatChange({ id, username })}>{username}</p>)}
            </div>
            <hr />
            <div id="messages">
                {messages.map((message, index) => <p key={index}>{message}</p>)}
            </div>
            <form id="form" action="" className="input-box">
                <input type="text" value={message} onChange={(ev) => setmessage(ev.target.value)} />
                <button onClick={appendMessage}>Send</button>
            </form>
        </div>
    );
}

export default Chat;