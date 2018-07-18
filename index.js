var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var chatHistory = [];

var clients = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('user connected', 'a new user connected!');
  socket.broadcast.emit('hi');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('user disconnected', 'a user disconnected!');
  });
  io.emit('some event', { for: 'everyone' });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
