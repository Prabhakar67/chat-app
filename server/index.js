const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`user joined ${socket.id}`);
    // let userName = prompt('enter your name');
    // socket.broadcast.emit('user_joined', userName);
    // console.log(socket);
    socket.on('send_Message', (data) => {
        console.log(`${data} from server`);
        socket.broadcast.emit('receive_Message', data);
    });

    socket.on('user_joined', (data)=>{
        socket.broadcast.emit('user_joined_server', data);
    });
})

server.listen(3001, () => {
    console.log('server is running');
});