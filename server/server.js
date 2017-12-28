const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(public_path));


io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: "akshay@gmail.com",
        text:"Hey there. Call me",
        createdAt: 123
    });

    socket.emit('newMessage', {
        from: "akshay@gmail.com",
        text:"Hey there. Call me",
        createdAt: 123
    })
    
    socket.on('createMessage', (message)=>{
        console.log('createMessage',message);
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });


})


server.listen(port, ()=>{
    console.log("server is up on port "+port);
});