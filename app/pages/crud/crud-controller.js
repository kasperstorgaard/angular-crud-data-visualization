require('../../services/post-service.js');

module.exports = function ($scope, PostService) {
    $scope.posts = PostService.getPosts();

    $scope.editorPost = PostService.getEmptyPost();
    $scope.isUpdatingPost = false;

    $scope.submitPost = submitPost;
    $scope.deletePost = deletePost;
    $scope.editPost = editPost;

    //---------------------------------------------------//
    function deletePost(post){
        PostService.deletePost(post.id);
    }

    function submitPost(post){
        if(post.isNew){
            PostService.createPost(post);
        }else{
            PostService.updatePost(post);
        }

        $scope.editorPost = PostService.getEmptyPost();
    }

    function editPost(post){
        $scope.editorPost = post;
    }
};
