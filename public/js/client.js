
const socket = io();


let username;

do {
    username = prompt("Enter your name")
}
while (!username)

socket.emit("new-user-joined", username);

socket.on("user-connected")