
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    var formattedTime = moment(data.createdAt).format('H:mm a');
    var li = jQuery('<li></li>');
    li.text(`${data.from} ${formattedTime}: ${data.text}`);

    jQuery("#messages").append(li);
});

socket.on('newLocationMessage', function(data) {
    console.log(JSON.stringify(data, undefined, 2));
    var formattedTime = moment(data.createdAt).format('H:mm a');
    var li = jQuery('<li></li>');
    
    var a = jQuery('<a target="_blank">My Current Location</a>')
    li.text(`${data.from} ${formattedTime}: `);
    a.attr('href', data.url);
    li.append(a)
    jQuery("#messages").append(li);
});

socket.on('AdminMessage', function(data){
    console.log(JSON.stringify(data.text, undefined, 2));
    var formattedTime = moment(data.createdAt).format('H:mm a');
    var li = jQuery('<li></li>');
    li.text(`${data.from} ${formattedTime}: ${data.text}`);
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

jQuery("#message-form").on('submit', function(e) {
    e.preventDefault();

    var messagetextbox = jQuery('[name=message]');

    socket.emit('createMessage',{
        from: 'User',
        text: messagetextbox.val()
    }, function(){
        messagetextbox.val('');
    })
});

locationButton = jQuery("#send-location");
locationButton.on('click', function(){
    console.log("reached")
    if(!navigator.geolocation){
        return alert('geolocation not supported on your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location');
    })
})