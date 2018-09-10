'use strict';
const express = require('express');
const app = express();
const path = require('path');

app.use('/public', express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.listen(8090);
