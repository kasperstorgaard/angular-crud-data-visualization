var _ = require('lodash');

require('./post-editor.tpl.html');
require('./post-editor.less');

module.exports = function postEditor () {
    return {
        restrict: 'A',
        templateUrl: "post-editor.tpl.html",
        replace: true,
        scope: {
            post: '=postEditor',
            submit: '&'
        },
        controller: function($scope){
            $scope.$watch('post.id', updateEditor);

            updateEditor();

            function updateEditor(){
                $scope.headerText = $scope.post.isNew
                    ? 'Create a post'
                    : 'Edit a post';
                $scope.saveText = $scope.post.isNew
                    ? 'Create'
                    : 'Save';
            }
        }
    };
};
