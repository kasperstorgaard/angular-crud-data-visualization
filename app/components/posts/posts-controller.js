//dependencies
require('./posts-factory'); //this will only help keep the dependencies in order,
                            //not actually return anything of use in this context.
//posts styles
require('./posts.less');

module.exports = function ($scope, Posts) {
  $scope.posts = Posts;
}

