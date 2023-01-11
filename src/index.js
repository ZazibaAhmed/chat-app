const express = require('express');
const http = require('http');
const path = require('path'); // core node module
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

// Setup static directory to serve up
app.use(express.static(publicDirectoryPath));



io.on('connection', (socket) => { // runs for each different connection

  console.log(`New WebSocket connection`);

  socket.emit('message', 'Welcome!');
  socket.broadcast.emit('message', "A new user has joined!");

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if(filter.isProfane(message)){
      return callback('Profanity is not allowed')
    }

    io.emit('message', message) 
    callback()
 
  });

  socket.on('sendLocation', (location, callback) => {
    io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`);
    callback()
  });

  socket.on('disconnect', () => {
    io.emit('message', "A user has left");
  })

})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})