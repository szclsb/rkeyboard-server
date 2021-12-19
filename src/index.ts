import express from 'express';
import http from 'http';
import {Server, Socket} from "socket.io";
import {ArgumentParser } from "argparse";

const secret = 'mysecret';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const events = ['keyDown', 'keyUp'];
// const users: { [id: string]: Socket; } = {}

const parser = new ArgumentParser({
    description: 'Argparse example'
});
parser.add_argument('-d', '--debug', {action: 'store_true'});
parser.add_argument('-p', '--port', { default: 3000, type: Number });

const args = parser.parse_args()

io.on('connection', socket => {
    //todo secret
    //todo join as sender or subscriber

    console.log(`user connected: ${socket.id}`)
    // users[socket.id] = socket;

    for (let event of events) {
        socket.on(event, key => {
            if (args.debug) console.log(`${event}: ${key}`);
            socket.broadcast.emit(event, key);
        });
    }
    socket.on('disconnect', () => {
        // delete users[socket.id];
        console.log(`user disconnected ${socket.id}`);
    });
});

server.listen(args.port, () => {
    console.log(`mode:${args.debug ? 'debug' : 'production'}`);
    console.log(`listening on *:${args.port}`);
});