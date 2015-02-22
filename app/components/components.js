function mount(app) {
    app.directive('post', require('./posts/post/post-directive.js'));

    app.directive('postEditor', require('./posts/post-editor/post-editor-directive.js'));

    app.controller('liveGraphController', require('./live-graph/live-graph-controller.js'));
    app.directive('liveGraph', require('./live-graph/live-graph-directive.js'));

    app.directive('navbarDirective', require('./navbar/navbar-directive.js'));
}

module.exports = {mount: mount};