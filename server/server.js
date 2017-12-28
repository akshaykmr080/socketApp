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
    
    socket.emit('AdminMessage', {
        from:'Admin',
        text: 'Welcome to chat App',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('NewUserMessage',{
        from:'Admin',
        text:'New user joined',
        createdAt: new Date().getTime()
    });
    socket.on('createMessage', (message)=>{
        console.log('createMessage',message);
        //broadcasting to all users including the user from whome the msg was received
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

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