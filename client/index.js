class SocketClient {
  constructor() {
    this.socket = io();
    this.socket.on("msg_to_client", (msg) => {
      const item = document.createElement("li");
      item.textContent = msg;
      document.getElementById("messages").appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    this.socket.on("user_connected_to_client", (user) => {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
        <div class="modal-content">
          <p>${user} has joined the chat</p>
        </div>
      `;
      document.body.appendChild(modal);
      setTimeout(() => {
        modal.remove();
      }, 2000);
    });
  }

  emitMessage(ev, username) {
    ev.preventDefault();
    const input = document.getElementById("input");
    if (input.value) {
      this.socket.emit("msg_to_server", `${username}: ${input.value}`);
      input.value = "";
    }
  }

  emitUsername(username) {
    this.socket.emit("user_connected_to_server", username);
  }
}

document.addEventListener("DOMContentLoaded", (ev) => {
  const client = new SocketClient();
  const username = handleUsername();
  client.emitUsername(username);
  document
    .getElementById("form")
    .addEventListener("submit", (ev) => client.emitMessage(ev, username));
});

const getUsername = () => localStorage.getItem("username");

const setUsername = (username) => localStorage.setItem("username", username);

const handleUsername = () => {
  let username = getUsername();
  if (!username) {
    username = prompt("Please enter your username");
    if (username) {
      setUsername(username);
      return username;
    } else {
      handleUsername();
    }
  } else {
    return username;
  }
};
