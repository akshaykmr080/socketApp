
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
    // socket.emit('createEmail', {
    //     to:'vidhatri@gmail.com',
    //     text:'Hey. This is andrew'
    // });

    socket.emit('createMessage', {
        from:'vidhatri@gmail.com',
        text:'Hey. This is andrew'
    })
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    console.log('New Message');
    console.log(JSON.stringify(data, undefined, 2));
})
