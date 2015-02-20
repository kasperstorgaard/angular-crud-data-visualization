//dependencies
require('../../services/posts-service.js');

//imports
_ = require('lodash');

//posts styles
require('./form.less');

module.exports = function ($scope, PostsService) {
  setCreateMode();
  $scope.post = PostsService.getEmptyPost();

  $scope.submitAction = function(){
    if(!$scope.isEdit){
      PostsService.createPost($scope.post);
      $scope.post = PostsService.getEmptyPost();
      return;
    }

    PostsService.updatePost($scope.post);
    setCreateMode();
    $scope.post = PostsService.getEmptyPost();
  };

  $scope.$on('edit:post', function(event, post){
    setEditMode();
    post.scheduled = new Date(post.scheduled); //parse to Date obj as it is string after the filter has been applied
    $scope.post = post;
  });

  function setEditMode(){
    $scope.headerText = 'Edit a post';
    $scope.saveText = 'Save';
    $scope.isEdit = true;
  }

  function setCreateMode(){
    $scope.headerText = 'Create a post';
    $scope.saveText = 'Create';
    $scope.isEdit = false;
  }
}
