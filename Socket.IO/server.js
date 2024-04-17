const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')({
    cors: {
      origin: '*'
    }
  });
const PORT = 8000;


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);


    socket.on('message', (data) => {
        socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

io.listen(PORT);
console.log('Server running on port', PORT);





