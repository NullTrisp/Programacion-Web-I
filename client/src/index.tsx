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
import { changeInstalled, changeUpdate } from './store/appStatus';

const pwaInstalled = window.matchMedia('(display-mode: standalone)').matches || store.getState().status.installed;

window.onload = async () => { if (Notification.permission === "default") await Notification.requestPermission(); }

serviceWorkerRegistration.register({
  onSuccess: async (registration: ServiceWorkerRegistration) => {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
    if (pwaInstalled) return;
    await registration.showNotification("This is a PWA you can install it!");
  },
  onUpdate: async (registration: ServiceWorkerRegistration) => {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
    store.dispatch(changeUpdate(true))
    await registration.showNotification("There's a new update available, please close and reopen the app!");
  }
});

window.addEventListener("appinstalled", () => store.dispatch(changeInstalled(true)));
window.addEventListener('beforeinstallprompt', () => store.dispatch(changeInstalled(false)));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App socketClient={new SocketClient()} />
    </Provider>
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
