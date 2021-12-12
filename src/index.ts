import express from 'express';
import http from 'http';
import { Server } from "socket.io";

const port = 3000;
const secret = 'mysecret';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', socket => {
    console.log(`user connected: ${socket.id}`)

    socket.on('key', key => {
        process.stdout.write(key);
    });
    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});