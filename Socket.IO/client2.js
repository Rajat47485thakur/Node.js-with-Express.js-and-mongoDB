const io = require('socket.io-client');
const socket = io('http://localhost:8000');

socket.on('connect', () => {
    console.log('Connected to server!');

    socket.emit('message', 'Hello from client 02!');
});

socket.on('message', (data) => {
    console.log('Message :', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server!');
});