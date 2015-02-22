//dependencies
require('./live-graph-controller.js');

require('./live-graph.tpl.html');
require('./live-graph.less');


module.exports = function liveGraph() {
    return {
        restrict: 'A',
        controller: 'liveGraphController',
        templateUrl: "live-graph.tpl.html",
        replace: true,
        scope: {
            dataSource: '=liveGraph',
            domains: '='
        },
        link: function(scope, element, attrs, ctrl){
            var $svgEl = element.find("svg");

            if(!$svgEl || $svgEl.length === 0){
                return;
            }

            ctrl.setupChart($svgEl[0], scope.domains);

            scope.$watchCollection('dataSource', function() {
                if(!scope.dataSource || scope.dataSource.length === 0){
                    return;
                }
                ctrl.updateLines(scope.dataSource);
            });
        }
    };
};
