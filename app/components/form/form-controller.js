//dependencies
require('../../services/posts-service.js');

//posts styles
require('./form.less');

module.exports = function ($scope, PostsService) {
  $scope.formMode = 'create';

  $scope.post = getNewPost();

  $scope.new = function(){
    $scope.post = getNewPost();
  }
}


function getNewPost(){
  return {
    id: getNewId(),
    content: {
      message: '',
      network: '',
      postType: '',
      media: {
        url: '',
        fileName: ''
      }
    },
    tags: [],
    status: '',
    channels: [],
    scheduled: '',
    geo: {
      countries: [],
      languages: [],
      cities: [],
      regions: []
    }
  };
}

function getNewId(){
  return Math.floor(Math.random()*100000);
}
