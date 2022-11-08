import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { add } from '../store/userSlice';
import Chat from './Chat';


function Username() {
    const userFromStore = useAppSelector(state => state.user)
    const salaFromStore = useAppSelector(state => state.sala)
    const dispatch = useAppDispatch()


    const [username, setUsername] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleUsernameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setModalIsOpen(false);
        dispatch(add({ username, id: "" }));
        localStorage.setItem("username", username);
    }

    return (
        <div>
            {
                userFromStore.username === "" &&
                <Modal isOpen={modalIsOpen}>
                    <form onSubmit={handleUsernameSubmit}>
                        <label>
                            Username:
                            <input type="text" value={username} onChange={handleUsernameChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </Modal>
            }

            <h1>Hello {userFromStore.username}</h1>
            <h4> {salaFromStore.name === "general" ? "General Room" : `Whisper to ${salaFromStore.name}`}</h4>
            <Chat />
        </div>
    );
}

export default Username;
