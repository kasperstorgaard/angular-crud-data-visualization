//dependencies
require('./data-visualization-controller.js');

//template
require('./data-visualization.tpl.html');

module.exports = function dataVisualizationDirective() {
  return {
    restrict: 'A',
    controller: 'dataVisualizationController',
    templateUrl: "data-visualization.tpl.html",
    replace: true,
    link: function(scope, element, attrs, ctrl){
      var rawSvg = element.find("svg")[0],
          svg = d3.select(rawSvg),
          pathClass = "path",
          padding = 20,
          Line,
          initial = true;

      scope.dataCollection = ctrl.collection;

      scope.$watchCollection('dataCollection', function(newVal, oldVal) {
        scope.dataCollection = newVal;
        if(!scope.dataCollection || scope.dataCollection.length === 0){
          return;
        }
        redrawChart();
      });

      function setupChart() {
        Line = d3.svg.line()
          .x(function (d) {
            return chartParameters.xScale(d['post_impressions'][0].timestamp);
          })
          .y(function (d) {
            return chartParameters.yScale(d['post_impressions'][0].value);
          })
          .interpolate("basis");

        svg.append("svg:g")
           .attr("class", "x axis")
           .attr("transform", "translate(0,180)")
           .call(chartParameters.xAxisGen);

         svg.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(20,0)")
            .call(chartParameters.yAxisGen);

         svg.append("svg:path")
            .attr({
              d: Line(scope.dataCollection),
              "stroke": "blue",
              "stroke-width": 2,
              "fill": "none",
              "class": pathClass
         });
      }

      function redrawChart() {
        chartParameters = ctrl.getChartParameters(rawSvg, padding);

        if(initial){
          initial = false;


          setupChart();
        }

        svg.selectAll("g.y.axis").call(chartParameters.yAxisGen);
        svg.selectAll("g.x.axis").call(chartParameters.xAxisGen);

        svg.selectAll("." + pathClass)
          .attr({
            d: Line(scope.dataCollection)
          });
      }
    }
  };
};
