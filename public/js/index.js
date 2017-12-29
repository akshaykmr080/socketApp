
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

socket.on('newLocationMessage', function(data) {
    console.log(JSON.stringify(data, undefined, 2));
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>')
    li.text(`${data.from}: `);
    a.attr('href', data.url);
    li.append(a)
    jQuery("#messages").append(li);
});

socket.on('AdminMessage', function(data){
    console.log(JSON.stringify(data.text, undefined, 2));
    var li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);

    jQuery("#messages").append(li);
});

socket.on('NewUserMessage', function(data){
    console.log(JSON.stringify(data.text, undefined, 2));
    var li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);

    jQuery("#messages").append(li);
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
});

locationButton = jQuery("#send-location");
locationButton.on('click', function(){
    console.log("reached")
    if(!navigator.geolocation){
        return alert('geolocation not supported on your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        alert('unable to fetch location');
    })
})