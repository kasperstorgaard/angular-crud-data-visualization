//There is probably an angular library out there that would make this a lot simpler.
var WEBSOCKET_ENDPOINT = 'ws://localhost:8080';

var _ = require('lodash');

module.exports = function postsFactory($websocket) {
  var dataStream = $websocket(WEBSOCKET_ENDPOINT);

  var collection = [];

  dataStream.onMessage(function(resp) {
    var data;
    try {
       data = JSON.parse(resp.data)
    } catch(e){
       console.log('failed to parse response as JSON!');
       return;
    }
    handleMessage(collection, data);
  });

  return {
    collection: collection,
    get: function() {
      dataStream.send(JSON.stringify({ action: 'readAll' }));
    }
  };
}


//------------------------------------------------------------------//
function handleMessage(collection, data){
  switch (data.action){
    case 'createOne':
      return collection.push(data.item); //expects a single item in items from "backend"

    case 'updateOne':
      var index = _.indexOf(collection, {'id': data.item.id });
      return collection.splice(index, 1, data.item);

    case 'deleteOne':
      var index = _.indexOf(collection, {'id': data.item.id });
      return collection.splice(index, 1);

    default: //readAll, updateAll, deleteAll go here
      collection.splice(0, collection.length);

      _.forEach(data.items, function(item){
        collection.push(item)
      });
      return collection;
  }
}
