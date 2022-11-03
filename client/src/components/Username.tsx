import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { add } from '../store/userSlice';
import Chat from './Chat';


function Username() {
    const usernameFromStore = useAppSelector(state => state.user.value)
    const salaFromStore = useAppSelector(state => state.sala.value)
    const dispatch = useAppDispatch()


    const [username, setUsername] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleUsernameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setModalIsOpen(false);
        dispatch(add(username));
        localStorage.setItem("username", username);
    }

    return (
        <div>
            {
                usernameFromStore === "" &&
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

            <h1>Hello {usernameFromStore}</h1>
            <h4> {salaFromStore === "general" ? "General Room" : `Chat with ${salaFromStore}`}</h4>
            <Chat />
        </div>
    );
}

export default Username;
