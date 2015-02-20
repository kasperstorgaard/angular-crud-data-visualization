//dependencies
require('../../services/posts-service.js');

//posts styles
require('./posts.less');

module.exports = function ($scope, $rootScope, PostsService) { //TODO: $rootScope is not ideal, make a wrapper
  $scope.posts = PostsService.getPosts();

  $scope.deletePost = function(id){
    PostsService.deletePost(id);
  }

  $scope.editPost = function(post){
    post.isEditing = true;
    $rootScope.$broadcast('edit:post', post);
  }
}
