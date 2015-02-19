//imports
var WebSocketServer = require('ws').Server;
var _ = require('lodash');

var fakeDb = [{"id":"8a1330c93e31b8af013e360d6a2106ea","content":{"message":"Her er den perfekte gave","id":"8a1330c93e31b8af013e360d6a2106ea","network":"facebook","postType":"photo","media":{"fileName":"konfirmationsgave til hende.jpg","url":"http://s3.amazonaws.com/mingler.falcon.scheduled_post_pictures/25c69cba-8881-4147-9fc9-d61a9c2de676"}},"tags":["converstaion","sales"],"status":"draft","channels":[{"name":"Konfirmanden","id":433104606739910}],"scheduled":"2013-08-08T08:00:00.000Z","geo":{"countries":[{"value":"Afghanistan","key":"134"}],"languages":[{"value":"Afrikaans","key":"31"}],"cities":[],"regions":[]}}];

var wss = new WebSocketServer({port: 8080});
console.log('websocket listening on: localhost:8080');

wss.on('connection', function(ws) {
  ws.on('message', function(req) {
    var action = req.action;

      switch (action){
        case 'createOne':
          createOne(ws, req);
          return;
        case 'readAll':
          readAll(ws, req);
          return;
        case 'updateOne':
          updateOne(ws, req);
          return;
        case 'updateAll':
          updateAll(ws, req);
          return;
        case 'deleteOne':
          deleteOne(ws, req);
        case 'deleteAll':
          deleteAll(ws, req);
        default:
          readAll(ws, req);
      }
  });
});

//------------------------------- CRUD -------------------------------//
function createOne(ws, req){
  fakeDb.push(req.data);

  ws.send(JSON.stringify({item: req.data, action: 'createOne'}));
}

function readAll(ws, req){
  ws.send(JSON.stringify({items: fakeDb, action: 'readAll'}));
}

function updateOne(ws, req){
  var post = _.find(fakeDb, {'id': req.data }),
      updated = removedArr.length != 0;

  if(post.length != 0){
    post = _.assign(post, req.data);
  }

  ws.send(JSON.stringify({item: post, action: 'updateOne'}));
}

function updateAll(ws, req){
  fakeDb = _.map(fakeDb, function(post){
    return _.assign(post, req.data);
  });

  ws.send(JSON.stringify({items: fakeDb, action: 'updateAll'}));
}

function deleteOne(ws, req){
  var removedArr = _.remove(fakeDb, {'id': req.data }),
      updated = removedArr.length != 0;

  ws.send(JSON.stringify({item: removedArr[0], action: 'deleteOne'}));
}

function deleteAll(ws, req){
  fakeDb = [];

  ws.send(JSON.stringify({items: fakeDb, action: 'deleteAll'}));
}
