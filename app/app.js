//styles
require('./layout/layout.less');

//html
require('./components/navbar/navbar.tpl.html');

//initialize
var app = angular.module('app', ['angular-websocket', 'ui.bootstrap']);

//services
app.service('PostsService', require('./services/posts-service.js'))

//posts
app.controller('postsController', require('./components/posts/posts-controller.js'))
app.directive('postsDirective', require('./components/posts/posts-directive.js'))

//form
app.controller('formController', require('./components/form/form-controller.js'))
app.directive('formDirective', require('./components/form/form-directive.js'))

//navbar
app.directive('navbarDirective', require('./components/navbar/navbar-directive.js'))

module.exports = app;
