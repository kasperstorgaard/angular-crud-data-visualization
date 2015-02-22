require('../../services/post-impressions-service.js');

module.exports = function ($scope, PostImpressionsService) {
    $scope.postImpressions = PostImpressionsService.get();
};