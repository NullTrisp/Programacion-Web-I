import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import SocketClient from './SocketClient';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertComponent from './components/Alert';

const pwaInstalled = window.matchMedia('(display-mode: standalone)').matches;

serviceWorkerRegistration.register({
  onSuccess: async (registration: ServiceWorkerRegistration) => {
    if (Notification.permission === "default") {
      await Notification.requestPermission()
    }

    if (pwaInstalled) return;
    await registration.showNotification("This is a PWA you can install it!");
  },
  onUpdate: async (registration: ServiceWorkerRegistration) => {
    if (Notification.permission === "default") {
      await Notification.requestPermission()
    } else if (Notification.permission === "denied") {
    }
    await registration.showNotification("There's a new update available, please close and reopen the app!");
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {!pwaInstalled ?
        <AlertComponent id="alerta-pwa" message={"This app can be installed! :) "} variant={"info"} /> : ""}
      <App socketClient={new SocketClient()} />
    </Provider>
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
