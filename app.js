var express = require('express');

require('./websocket-server.js'); //this will start the websocket server

var app = express();
app.use('/', express.static(__dirname));
app.listen(3000, function() { console.log('listening')});
