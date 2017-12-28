
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
    var li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);

    jQuery("#messages").append(li);
});

socket.on('AdminMessage', function(data){
    console.log(JSON.stringify(data.text, undefined, 2));
});

socket.on('NewUserMessage', function(data){
    console.log(JSON.stringify(data.text, undefined, 2));
})

// socket.emit('createMessage', {
//     from: 'Frank',
//     text:'Hello Gottcha'
// }, function(value) {
//     console.log(value)
// });

jQuery("#form").on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    })
})