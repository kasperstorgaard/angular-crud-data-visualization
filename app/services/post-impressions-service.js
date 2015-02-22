var WEBSOCKET_ENDPOINT = 'ws://localhost:8080';

var _ = require('lodash');

module.exports = function postImpressionsService($websocket, $q) {
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
        var splitData = splitIntoTypes(data);

        if(!splitData){
            return;
        }

        var formatted = {
            base: formatData(splitData.base),
            organic: formatData(splitData.organic),
            viral: formatData(splitData.viral),
            paid: formatData(splitData.paid)
        };

        if(!formatted.base.x || !formatted.base.y){
            console.log('invalid data');
            return;
        }

        collection.push(formatted.base); //TODO: implement multiple
        return;
    });

    return {
        get: function() {
            interval = setInterval(function(){
                dataStream.send(JSON.stringify({ action: 'getDataVisualization' }));
            }, 1000);

            return collection;
        }
    };
}


//------------------------------------------------------------------//
function splitIntoTypes(rawData){
    if(!rawData || !rawData['post_impressions']){
        return null;
    }

    return {
        'base': rawData['post_impressions'] && rawData['post_impressions'][0],
        'organic': rawData['post_impressions_organic'] && rawData['post_impressions_organic'][0],
        'viral': rawData['post_impressions_viral'] && rawData['post_impressions_viral'][0],
        'paid': rawData['post_impressions_paid'] && rawData['post_impressions_paid'][0]
    };
}

function formatData(data){
    data.x = data.timestamp && (getTime(data.timestamp) || null);
    data.y = data.value && (parseInt(data.value) || null);
    delete data.timestamp;
    delete data.value;

    return data;
}

function getTime(time){
    return (new Date(time)).getTime();
}
