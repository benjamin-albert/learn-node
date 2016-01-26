var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var save = require('./save');

app.use(bodyParser.json());
app.use('/bower_components', express.static('./bower_components'));
app.use('/static', express.static('./static'));
app.use('/hello', express.static('./hello.html'));

app.post('/events/:id', save);
app.put('/events/:id', save);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/events', function(req, res) {
  res.json([
    {id: 1, foo: 'bar'},
    {id: 2, baz: 'qux'},
  ]);
});

// app.get('/hello', function(req, res) {
//   res.sendFile(__dirname + '/hello.html');
// });

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('chat message', function(msg) {
    console.log('User message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('typing', function() {
    io.emit('typing');
  });

  socket.on('stop typing', function() {
    io.emit('stop typing');
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
