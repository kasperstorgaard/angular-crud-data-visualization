var _ = require('lodash');

var WEBSOCKET_ENDPOINT = 'ws://localhost:8080';

module.exports = function postService($websocket) {
    var dataStream = $websocket(WEBSOCKET_ENDPOINT);

    var collection = [];

    dataStream.onMessage(handleResponse);

    //service public methods
    return {
        getPosts: getPosts,
        deletePost: deletePost,
        createPost: createPost,
        updatePost: updatePost,
        getEmptyPost: getEmptyPost
    };

    //--------------------------------------------------------//

    function handleResponse(resp){
        var data;
        try {
            data = JSON.parse(resp.data)
        } catch(e){
            console.log('failed to parse response as JSON!');
            return;
        }

        if(!data.action || !data.items || !data.items[0]){
            return;
        }

        performAction(data.action, data.items);
    }

    function performAction(action, items){
        switch (action){
            case 'createOne':
                return collection.unshift(fromDbFormat(items[0]));

            case 'updateOne':
                var index = _.findIndex(collection, {'id': items[0].id });
                return collection.splice(index, 1, fromDbFormat(items[0]));

            case 'deleteOne':
                var index = _.findIndex(collection, {'id': items[0].id });
                return collection.splice(index, 1);

            default: //readAll, updateAll, deleteAll go here
                collection.splice(0, collection.length);

                _.forEach(items, function(item){
                    collection.push(fromDbFormat(item));
                });
                return collection;
        }
    }

    function getPosts() {
        dataStream.send(JSON.stringify({ action: 'readAll' }));
        return collection;
    }

    function deletePost(id){
        dataStream.send(JSON.stringify({ action: 'deleteOne', data: id }));
    }

    function createPost(post){
        var data = toDbFormat(post);
        dataStream.send(JSON.stringify({action: 'createOne', data: data }));
    }

    function updatePost(post){
        var data = toDbFormat(post);
        dataStream.send(JSON.stringify({action: 'updateOne', data: data }));
    }
}

//------------------------------------------------------------------//


function toDbFormat(post){
    delete post.isNew;
    post.scheduled = post.scheduled.toISOString();
    post.tags = !post.tags.trim()
        ? []
        : _.map(post.tags.split(','), function(tag){ return tag.trim();});

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
        isNew: true,
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
        scheduled: new Date(),
        geo: {
            countries: '',
            languages: '',
            cities: '',
            regions: ''
        }
    };
}
