// const io = require("socket.io-client");

// const io=require("socket.io")
const socket = io();

var username;
let chats = document.querySelector(".chats");
let users_list=document.querySelector(".users-list")
let users_count = document.querySelector(".users-count");
let msg_send = document.querySelector("#user-send");
let user_msg = document.querySelector("#user-msg");

console.log(chats);
do {
  username = prompt("Enter your name");
} while (!username);

socket.emit("new-user-joined", username);

socket.on("user-connected", (socket_name) => {
  userJoinLeft(socket_name, "joined");
  console.log(socket_name);
});

function userJoinLeft(name, status) {
  let div = document.createElement("div");
  div.classList.add("user-join");
  let content = `<p><b>${name}</b> -${status} the chat</p>`;
  div.innerHTML = content;
  chats.appendChild(div);
}

socket.on("user-disconnected", (user) => {
  userJoinLeft(user, " left");
});


socket.on("user-list", (users) => {
  users_list.innerHTML = "";
  let users_arr = Object.values(users);
  for (let i = 0; i < users_arr.length; i++) {
    let p = document.createElement("p");
    p.innerText = users_arr[i];
    users_list.append(p);

  }
  users_count.innerHTML = users_arr.length;
});

msg_send.addEventListener('click', () => {
  let data = {
    user: username,
    msg: user_msg.value
  }
  if (user_msg.value != "") {
    appendMessage(data, "outgoing");
    socket.emit('message', data);
    user_msg.value = "";
  }
});

function appendMessage(data, status) {
  let div = document.createElement('div');
  div.classList.add("message", status);
  let contents = `<h5>${data.user}</h5><p>${data.msg}</p>`;
  div.innerHTML = contents;
  chats.append(div);
  chats.scrollTop = chats.scrollHeight;
}

socket.on("message", (data) => {
  appendMessage(data,"incoming")
})