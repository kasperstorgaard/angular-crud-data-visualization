//dependencies
require('./posts-controller');

//template
require('./posts.tpl.html')

module.exports = function postsDirective () {
  return {
    restrict: 'A',
    controller: 'postsCtrl',
    templateUrl: "posts.tpl.html",
    replace: true,
    link: function (scope, element) {
      console.log('hello from link :)');
    }
  };
};
