//dependencies
require('../../services/posts-service.js');

//posts styles
require('./posts.less');

module.exports = function ($scope, PostsService) {
  $scope.posts = PostsService.collection;
  PostsService.get();

  $scope.deletePost = function(id){
    PostsService.deletePost(id);
  }
}

