import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { io } from 'socket.io-client';
import { pushMessage } from './store/messagesSlice';
import { addUser } from './store/userSlice';
import { User } from './types/User';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const socketClient = io("ws://localhost:4000");
const dispatch = store.dispatch;

socketClient.on("msg_to_client", (message: string) => {
  console.log("msg_to_client", message);
  window.scrollTo(0, document.body.scrollHeight);
  dispatch(pushMessage(message));
});

socketClient.on("user_connected_to_client", ({ username, id }: User) => {
  console.log("user_connected_to_client", username, id);
  dispatch(pushMessage(`${username} has connected`));
});

socketClient.on("user_connected_to_client_return_user", ({ username, id }: User) => {
  console.log("user_connected_to_client_return_user", username, id);
  dispatch(addUser({ username, id }));
});

socketClient.on("private_message_to_user", (message: string) => {
  console.log("private_message_to_user", message);
  window.scrollTo(0, document.body.scrollHeight);
  dispatch(pushMessage(message));
});

if (store.getState().user.username !== "") {
  console.log("user_connected_to_server", store.getState().user.username);
  socketClient.emit("user_connected_to_server", store.getState().user.username);
}

socketClient.on("user_disconnected_to_client", ({ username, id }: User) => {
  console.log("user_disconnected_to_client", username, id);
  dispatch(pushMessage(`${username} has disconnected`));
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App socketClient={socketClient} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
