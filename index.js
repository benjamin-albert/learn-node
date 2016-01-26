var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/bower_components', express.static('./bower_components'));
app.use('/hello', express.static('./hello.html'));

app.post('/event', function(req, resp) {
  var attrs = req.body;
  console.log(attrs);
  console.log();
  if (attrs.lorem) {
    console.log("Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare vitae turpis ut dictum. Praesent tincidunt tellus non nunc scelerisque, vel rhoncus velit fringilla. Suspendisse ultrices nec enim porta imperdiet. Fusce nec maximus lorem, ac pretium odio. Donec blandit lacinia ligula non imperdiet. Vivamus a turpis diam. Donec id ante vel quam hendrerit luctus nec ultricies sem. Suspendisse quam magna, lacinia at ligula sed, mollis venenatis libero. Sed congue urna ut est tristique, nec rutrum nisl pulvinar. Nunc consectetur nunc massa, sit amet imperdiet risus feugiat at. Aenean eu hendrerit purus. Donec at nibh fermentum, faucibus elit et, sagittis risus. Sed egestas luctus arcu eu tristique. Morbi sed tincidunt enim, fringilla scelerisque velit.");
  }

  resp.json({ status: 'ok' });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
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
