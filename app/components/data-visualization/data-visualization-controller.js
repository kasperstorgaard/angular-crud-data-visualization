//dependencies
require('../../services/data-visualization-service.js');

//imports
var _ = require('lodash');
var d3 = require('d3');

//posts styles
require('./data-visualization.less');

module.exports = function ($scope, DataVisualizationService) {
  this.collection = DataVisualizationService.getData();

  this.getChartParameters = function getChartParameters(rawSvg, padding){
      var xScale = d3.scale.linear()
       .domain(
         [this.collection[0]['post_impressions'][0].timestamp,
         this.collection[this.collection.length - 1]['post_impressions'][0].timestamp]
       )
       .range([padding + 5, rawSvg.clientWidth - padding]);

      var yScale = d3.scale.linear()
        .domain([0, d3.max(this.collection, function (d) {
          return d['post_impressions'][0].value;
        })])
        .range([rawSvg.clientHeight - padding, 0]);

      var xAxisGen = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(this.collection.length - 1);

      var yAxisGen = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

      return {xScale: xScale, yScale: yScale, xAxisGen: xAxisGen, yAxisGen: yAxisGen};
    }
};

