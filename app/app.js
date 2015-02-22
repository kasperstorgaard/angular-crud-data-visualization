require('./layout/layout.less');

var app = angular.module('app', [
    'angular-websocket',
    'ngRoute',
    'ui.bootstrap'
]);

//routes & pages
require('./pages/router.js').mount(app);

//components
var components = require('./components/components.js');
components.mount(app);

//services
var services = require('./services/services.js');
services.mount(app);

module.exports = app;