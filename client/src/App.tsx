import React from 'react';
import './App.css';
import { useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { User } from './types/User';
import { changeSala } from './store/salaSlice';
import { addUser, removeUser } from './store/userSlice';
import { pushMessage } from './store/messagesSlice';
import SocketClient from './SocketClient';


export default function App({ socketClient }: { socketClient: SocketClient }) {
  // Collect the state from the store
  const userFromStore = useAppSelector(state => state.user)
  const salaFromStore = useAppSelector(state => state.sala)
  const messagesFromStore = useAppSelector(state => state.messages);

  // Create a dispatch function
  const dispatch = useAppDispatch()

  // Create a state for the component
  const [activeUsers, setactiveUsers] = useState(Array<User>());
  const [username, setUsername] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setmessage] = useState("");

  // Handlers
  socketClient.socket.on("active_users_to_client", (users: User[]) => {
    setactiveUsers(users);
  });

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleUsernameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username !== "") {
      setModalIsOpen(false);
      dispatch(addUser({ username, id: "" }));
      sessionStorage.setItem("username", username);
      socketClient.socket.emit("user_connected_to_server", username);
      dispatch(pushMessage("You have connected"));
    }
  }

  const handleChatChange = ({ username, id }: User) => {
    dispatch(changeSala({ name: username, id }));
  }

  const appendMessage = (ev: React.MouseEvent) => {
    ev.preventDefault();
    if (message !== "") {
      setIsDisabled(true);
      if (salaFromStore.name === "general") {
        const messageToEmitt = `${userFromStore.username}: ${message}`;
        dispatch(pushMessage(messageToEmitt));
        socketClient.socket.emit("msg_to_server", messageToEmitt);
      } else {
        dispatch(pushMessage(`Private message to ${salaFromStore.name}: ${message}`));
        socketClient.socket.emit("private_message_to_server", { to: activeUsers.find(user => user.id === salaFromStore.id)?.id, content: `Private message from ${userFromStore.username}: ${message}` });
      }
      window.scrollTo(0, document.body.scrollHeight);
      setmessage("");
      setTimeout(() => setIsDisabled(false), 500);
    }
  }

  const handleLogout = () => {
    dispatch(removeUser());
    window.location.reload();
  }

  return (
    <div className="App">
      {
        userFromStore.username === "" &&
        <Modal isOpen={modalIsOpen} id="user-modal-login" appElement={document.getElementById('root')!}>
          <form onSubmit={handleUsernameSubmit}>
            <h1> Please enter your username </h1>
            <input type="text" value={username} onChange={handleUsernameChange} />
            <button type="submit" value="Submit"> Submit </button>
          </form>
        </Modal>
      }
      <div className="top">
        <h1> Hello {userFromStore.username}, you're now {salaFromStore.name === "general" ? "on the general room" : `whispering to ${salaFromStore.name}`}</h1>
        <h2> Active users </h2>
        <div className='boxing'>
          <p className='user-styled-button'> You </p>
          {
            activeUsers
              .filter(({ id }) => id !== userFromStore.id)
              .map((user, index) => <p className='styled-button' key={index} onClick={() => handleChatChange(user)}>{user.username}</p>)
          }
        </div>
        <div className='boxing'>
          {
            salaFromStore.name !== "general" ? <p className='styled-button' onClick={() => handleChatChange({ username: "general", id: "" })}> Send general messages </p> : ""
          }
        </div>
      </div>
      <div id="messages">
        {messagesFromStore.map((message, index) => {
          const username = message.split(":")[0] === userFromStore.username ?
            "user" :
            message.split(" ")[0] === "Private" ?
              "private" :
              message.split(" ")[message.split(" ").length - 1] === "disconnected" || message.split(" ")[message.split(" ").length - 1] === "connected" ?
                "status" :
                "external";
          return <div key={index} className={username}>{message}</div>;
        })}
      </div>
      <form className="message-box">
        <input type="text" value={message} onChange={(ev) => setmessage(ev.target.value)} />
        <button onClick={appendMessage} disabled={isDisabled}>Send</button>
      </form>

      <div className="logout-box">
        <button type="submit" onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
}
