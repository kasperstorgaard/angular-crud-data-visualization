//dependencies
require('./posts-controller');

//template
require('./posts.tpl.html');

module.exports = function postsDirective () {
  return {
    restrict: 'A',
    controller: 'postsController',
    templateUrl: "posts.tpl.html",
    replace: true
  };
};
