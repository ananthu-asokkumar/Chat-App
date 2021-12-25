

const http = require("http");

const express = require("express");
const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

const io = require("socket.io")(server);

let users = {};
io.on("connection", (socket) => {
    // console.log(socket.io);
    socket.on("new-user-joined", (username) => {
        users[socket.id] = username;
        // console.log(users);
        socket.broadcast.emit("user-connected".username)
    })
});

server.listen(port, () => {
    console.log("Server started at 3000");
})