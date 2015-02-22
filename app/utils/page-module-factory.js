var _ = require('lodash');

function create(pageName, files){
    var camelCasedName = _.map(pageName.split('-'), function(fragment, index){
        if(index !== 0){
            return fragment[0].toUpperCase() + fragment.substr(1);
        }
        return fragment;
    }).join('');

    var controllerName = camelCasedName + 'Controller';

    return {
        mount: function(app){
            app.controller(controllerName, files.controller);
            if(files.directive){
                app.directive(camelCasedName, files.directive);
            }
        },
        template: pageName + '.html',
        controller: controllerName
    };
}

module.exports = {create: create};

