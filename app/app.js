//styles
require('./main.less');


//initialize app module
var app = angular.module('app', ['angular-websocket']);

//posts
app.factory('Posts', require('./components/posts/posts-factory.js'))
app.controller('postsCtrl', require('./components/posts/posts-controller.js'))
app.directive('postsSection', require('./components/posts/posts-directive.js'))

module.exports = app;
