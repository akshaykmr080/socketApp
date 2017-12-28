const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');


var app = express();
const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(public_path));


io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.emit('AdminMessage', generateMessage('Admin','Welcome to the chat App'));
    socket.broadcast.emit('NewUserMessage',generateMessage('Admin','New user has joined'));
    
    socket.on('createMessage', (message)=>{
        console.log('createMessage',message);
        //broadcasting to all users including the user from whome the msg was received
        io.emit('newMessage', generateMessage(message.from, message.text))

        //broadcast to everyone except current user
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });


})


server.listen(port, ()=>{
    console.log("server is up on port "+port);
});