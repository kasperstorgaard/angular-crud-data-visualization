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
    handleResponse(collection, data);
  });

  return {
    getPosts: function() {
      dataStream.send(JSON.stringify({ action: 'readAll' }));
      return collection;
    },
    deletePost: function(id){
      dataStream.send(JSON.stringify({ action: 'deleteOne', data: id }));
    },
    createPost: function(post){
      var data = toDbFormat(post);
      dataStream.send(JSON.stringify({action: 'createOne', data: data }));
    },
    updatePost: function(post){
      var data = toDbFormat(post);
      dataStream.send(JSON.stringify({action: 'updateOne', data: data }));
    },
    getEmptyPost: getEmptyPost
  };
}


//------------------------------------------------------------------//
function handleResponse(collection, data){
  switch (data.action){
    case 'createOne':
      return collection.unshift(fromDbFormat(data.item));

    case 'updateOne':
      var index = _.findIndex(collection, {'id': data.item.id });
      return collection.splice(index, 1, fromDbFormat(data.item));

    case 'deleteOne':
      var index = _.findIndex(collection, {'id': data.item.id });
      return collection.splice(index, 1);

    default: //readAll, updateAll, deleteAll go here
      collection.splice(0, collection.length);

      _.forEach(data.items, function(item){
        collection.push(fromDbFormat(item));
      });
      return collection;
  }
}

function toDbFormat(post){
  post.scheduled = post.scheduled.toISOString();
  post.tags = _.map(post.tags.split(','), function(tag){ return tag.trim();});

  post.channels = _.map(post.channels.split(','), function(channel){
    return {"name":channel,"id":getNewId()};
  })
  post.geo.countries = stringToKeyValueArray(getNewId(), post.geo.countries);
  post.geo.languages = stringToKeyValueArray(getNewId(), post.geo.languages);
  post.geo.citites = stringToKeyValueArray(getNewId(), post.geo.cities);
  post.geo.regions = stringToKeyValueArray(getNewId(), post.geo.regions);

  return post;
}

function fromDbFormat(post){
  post.scheduled = new Date(post.scheduled);
  post.tags = post.tags.join(', ');
  post.channels = _.pluck(post.channels, 'name').join(', ');
  post.geo.countries = keyValueArrayToString(post.geo.countries);
  post.geo.languages = keyValueArrayToString(post.geo.languages);
  post.geo.cities = keyValueArrayToString(post.geo.cities);
  post.geo.regions = keyValueArrayToString(post.geo.regions);

  return post;
}

function stringToKeyValueArray(key, str){
  return _.map(str.split(','), function(value){
    return { key: key, value: value.trim() };
  });
}

function keyValueArrayToString(keyValueArray){
  return _.pluck(keyValueArray, 'value').join(', ');
}

function getNewId(){
  return Math.floor(Math.random()*100000);
}

function getEmptyPost(){
  return {
    id: getNewId(),
    content: {
      message: '',
      network: '',
      postType: '',
      media: {
        url: '',
        fileName: ''
      }
    },
    tags: '',
    status: '',
    channels: '',
    scheduled: '',
    geo: {
      countries: '',
      languages: '',
      cities: '',
      regions: ''
    }
  };
}
