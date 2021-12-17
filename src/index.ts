import express from 'express';
import http from 'http';
import {Server, Socket} from "socket.io";

const port = 3000;
const secret = 'mysecret';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const events = ['keyDown', 'keyUp'];
// const users: { [id: string]: Socket; } = {}

io.on('connection', socket => {
    //todo secret
    //todo join as sender or subscriber

    console.log(`user connected: ${socket.id}`)
    // users[socket.id] = socket;

    for (const event in events) {
        socket.on(event, key => {
            socket.broadcast.emit(event, key);
        });
    }
    socket.on('disconnect', () => {
        // delete users[socket.id];
        console.log(`user disconnected ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});