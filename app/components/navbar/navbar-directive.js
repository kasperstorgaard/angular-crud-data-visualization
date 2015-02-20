//template
require('./navbar.tpl.html')

module.exports = function postsDirective () {
  return {
    restrict: 'A',
    templateUrl: "navbar.tpl.html",
    replace: true,
    controller: function($scope){
      $scope.title = document.title;
    }
  };
};
