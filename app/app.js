//styles
require('./layout/layout.less');

//html
require('./components/navbar/navbar.tpl.html');

//initialize
var app = angular.module('app', [
  'angular-websocket',
  'ngRoute',
  'ui.bootstrap'
]);



//routes
require('./pages/crud.html');
require('./pages/data-visualization.html')

app.config(function($routeProvider) {
  $routeProvider.
    when('/crud', {
      templateUrl: 'crud.html'
    }).
    when('/datavisualization', {
      templateUrl: 'data-visualization.html'
    }).
    otherwise({
      redirectTo: '/crud'
    });
});

//services
app.service('PostsService', require('./services/posts-service.js'));
app.service('DataVisualizationService', require('./services/data-visualization-service.js'));


//posts
app.controller('postsController', require('./components/posts/posts-controller.js'));
app.directive('postsDirective', require('./components/posts/posts-directive.js'));

//form
app.controller('formController', require('./components/form/form-controller.js'));
app.directive('formDirective', require('./components/form/form-directive.js'));

//data visualization
app.controller('dataVisualizationController',
  require('./components/data-visualization/data-visualization-controller.js'));
app.directive('dataVisualizationDirective',
  require('./components/data-visualization/data-visualization-directive.js'));

//navbar
app.directive('navbarDirective', require('./components/navbar/navbar-directive.js'));

module.exports = app;
