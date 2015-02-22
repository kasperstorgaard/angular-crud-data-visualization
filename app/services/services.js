function mount(app){
    app.service('PostImpressionsService', require('./post-impressions-service.js'));
    app.service('PostService', require('./post-service.js'));
}

module.exports = {mount: mount};