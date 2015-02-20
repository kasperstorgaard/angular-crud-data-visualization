//dependencies
require('../../services/posts-service.js');

//imports
_ = require('lodash');

//posts styles
require('./form.less');

module.exports = function ($scope, PostsService) {
  $scope.isEdit = false;
  $scope.headerText = 'Create a post';
  $scope.saveText = 'Create';

  $scope.post = PostsService.getEmptyPost();

  $scope.submitAction = function(){
    if(!$scope.isEdit){
      PostsService.createPost($scope.post);
      return;
    }

    PostsService.updatePost($scope.post);
    $scope.isEdit = false;
    $scope.post = PostsService.getEmptyPost();
  };

  $scope.$on('edit:post', function(event, post){
    $scope.headerText = 'Edit a post';
    $scope.saveText = 'Save';
    $scope.post = post;
    $scope.isEdit = true;
  });
}
