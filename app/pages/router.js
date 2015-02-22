var _ = require('lodash');


var PageModuleFactory = require('../utils/page-module-factory.js');

function mount(app){
    var defaultPage = PageModuleFactory.create('crud', {
            controller: require('./crud/crud-controller.js'),
            template: require('./crud/crud.html'),
            less: require('./crud/crud.less')
        });

    var dataVisualizationPage = PageModuleFactory.create('data-visualization', {
            controller: require('./data-visualization/data-visualization-controller.js'),
            template: require('./data-visualization/data-visualization.html'),
            less: require('./data-visualization/data-visualization.less')
        });

    var pages = {
        '/crud': defaultPage,
        '/datavisualization': dataVisualizationPage,
        'default': '/crud'
    };

    _.invoke(pages, 'mount', app);

    app.config(function($routeProvider){
        _.forEach(pages, function(page, route){
            if(route == 'default'){
                $routeProvider.otherwise({
                    redirectTo: page
                });
                return;
            }

            $routeProvider.when(route, {
                templateUrl: page.template,
                controller: page.controller
            });
        });
    });

}

module.exports = {
    mount: mount
};
