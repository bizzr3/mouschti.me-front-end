'use strict';
const express = require('express');
const app = express();
const request = require('request');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

app.use('/public', express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

io.on('connection', client => {
  console.log('Client connected.');

  client.on('_cmd', data => {
    console.log(data);

    request(
      'http://dev-api.mouschti.me/api/v1/version',
      (error, response, body) => {
        setTimeout(() => {
          client.emit('cmd_', body);
        }, 2000);
      }
    );
  });
});

server.listen(8090);
