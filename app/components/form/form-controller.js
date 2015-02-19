//dependencies
require('../../services/posts-service.js');

//posts styles
require('./form.less');

module.exports = function ($scope, PostsService) {
  $scope.posts = PostsService.collection;
  PostsService.get();
}

