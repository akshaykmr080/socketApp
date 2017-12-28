
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    console.log('New Message');
    console.log(JSON.stringify(data, undefined, 2));
});

socket.on('AdminMessage', function(data){
    console.log(JSON.stringify(data.text, undefined, 2));
});

socket.on('NewUserMessage', function(data){
    console.log(JSON.stringify(data.text, undefined, 2));
})
