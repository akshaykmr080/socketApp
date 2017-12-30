const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

var app = express();
const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var users = new Users();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(public_path));


io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
           return callback('Name & room name are required');
        }

        socket.join(params.room);
        //socket.leave('The office room');
        
        //io.emit -> io.to('The office room').emit()    ------   Emit to all the users in a room
        //socket.broadcast.emit -> socket.broadcast.to('the Office room').emit()     ------  Emit to all users in a room except current user
        //socket.emit
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room);
        socket.emit('AdminMessage', generateMessage('Admin','Welcome to the chat App'));
        io.to(params.room).emit('updateUsersList', users.getUsersList(params.room));

        socket.broadcast.to(params.room).emit('NewUserMessage',generateMessage('Admin',`${params.name} has joined`));
        callback();
    });


    socket.on('createMessage', (message, callback)=>{
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            //broadcasting to all users including the user from whome the msg was received
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
            callback('This is from the server');
            //broadcast to everyone except current user
            // socket.broadcast.emit('newMessage', {
            //     from: message.from,
            //     text: message.text,
            //     createdAt: new Date().getTime()
            // })
        }
        
    });

    socket.on('createLocationMessage', (coords)=>{
         var user = users.getUser(socket.id);
        if(user && coords){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords))
        }
        
    })
    socket.on('disconnect', () => {
       var removeduser =  users.removeUser(socket.id);
        if(removeduser){
            io.to(removeduser.room).emit('updateUserList', users.getUsersList());
            io.to(removeduser.room).emit('newMessage', generateMessage('Admin', `${removeduser.name} has left the room`))
        }
    });


})


server.listen(port, ()=>{
    console.log("server is up on port "+port);
});