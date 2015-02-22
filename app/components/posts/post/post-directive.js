require('./post.tpl.html');
require('./post.less');

module.exports = function post () {
    return {
        restrict: 'A',
        templateUrl: "post.tpl.html",
        replace: true,
        scope: {
            post: '=',
            delete: '&',
            edit: '&'
        }
    };
};
