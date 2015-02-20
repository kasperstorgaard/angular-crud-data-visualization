var WEBSOCKET_ENDPOINT = 'ws://localhost:8080';

var _ = require('lodash');

module.exports = function dataVisualizationService($websocket, $q) {
  var dataStream = $websocket(WEBSOCKET_ENDPOINT);

  var collection = [];

  var interval;
    dataStream.onMessage(function(resp) {
      var data;
      try {
         data = JSON.parse(resp.data);
      } catch(e){
         clearInterval(interval);
         console.log('failed to parse response as JSON!');
         return;
      }
      if(!data){
        return;
      }
      var formatted = formatTimes(data);
      if(!formatted){
        return;
      }

      collection.push(formatted);
      return;
    });

  return {
    getData: function() {
      interval = setInterval(function(){
        dataStream.send(JSON.stringify({ action: 'getDataVisualization' }));
      }, 100);

      return collection;
    }
  };
}


//------------------------------------------------------------------//
function formatTimes(data){
  if(!data['post_impressions']){
    return null;
  }

  data['post_impressions'][0]['timestamp'] = getTimeInMinutes(data['post_impressions'][0]['timestamp']);
  data['post_impressions_organic'][0]['timestamp'] = getTimeInMinutes(data['post_impressions_organic'][0]['timestamp']);
  data['post_impressions_viral'][0]['timestamp'] = getTimeInMinutes(data['post_impressions_viral'][0]['timestamp']);
  data['post_impressions_paid'][0]['timestamp'] = getTimeInMinutes(data['post_impressions_paid'][0]['timestamp']);

  data['post_impressions'][0]['value'] = parseInt(data['post_impressions'][0]['value']);
  data['post_impressions_organic'][0]['value'] = parseInt(data['post_impressions_organic'][0]['value']);
  data['post_impressions_viral'][0]['value'] = parseInt(data['post_impressions_viral'][0]['value']);
  data['post_impressions_paid'][0]['value'] = parseInt(data['post_impressions_paid'][0]['value']);
  return data;
}

function getTimeInMinutes(time){
  return Math.floor((new Date(time)).getTime() / 1000 / 60);
}
