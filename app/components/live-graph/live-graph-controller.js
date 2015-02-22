//imports
var _ = require('lodash');
var d3 = require('d3');

module.exports = function liveGraphController() {
    var MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        PATH_CLASS = 'live-graph-path'

    //public methods
    this.setupChart = setupChart;
    this.updateLines = updateLines;

    //-------------------------------------------------------------//

    function setupChart(svgEl, domains){
        this.svg = this.svg || d3.select(svgEl);

        this.domains = validateDomains(domains);
        if(!this.domains){
            return;
        }

        this.width = svgEl.clientWidth;
        this.height = svgEl.clientHeight;

        this.ranges = getRanges(domains, this.width, this.height);

        updateAxis(this.svg, this.ranges, this.height)
    }

    function updateAxis(svg, ranges, height) {
        var axis = getAxis(ranges);
        drawAxis(svg, height, axis);
    }

    function updateLines(chartData) {
        var LineGenerator = getLineGenerator(this.ranges);
        drawLines(this.svg, LineGenerator, chartData);
    }

    function validateDomains(ranges){
        ranges = _.isString(ranges)
            ? JSON.parse(ranges)
            : ranges;

        if(!ranges || !ranges.x || !ranges.y){
            return false;
        }

        return ranges;
    }

    function getRanges(domains, width, height){
        var xRange = d3.time.scale()
            .domain([new Date(domains.x[0]), d3.time.second.offset(new Date(domains.x[1]), 1)])
            .rangeRound([MARGINS.left, width - MARGINS.right]);


        var yRange = d3.scale.linear()
            .range([height - MARGINS.top, MARGINS.bottom])
            .domain(domains.y);

        return [xRange, yRange];
    }

    function getAxis(ranges){
        var xAxis = d3.svg.axis()
            .scale(ranges[0])
            .orient('bottom')
            .ticks(d3.time.minute, 1)
            .tickFormat(d3.time.format('%M'))
            .tickSize(0)
            .tickPadding(8);

        var yAxis = d3.svg.axis()
            .scale(ranges[1])
            .tickSize(5)
            .orient("left")
            .tickSubdivide(true);

        return [xAxis, yAxis];
    }

    function drawAxis(svg, height, axis){
        svg.append('svg:g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (height - MARGINS.bottom) + ')')
            .call(axis[0]);

        svg.append('svg:g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
            .call(axis[1]);
    }

    function getLineGenerator(ranges){
        return d3.svg.line()
            .x(function(d) {
                return ranges[0](d.x);
            })
            .y(function(d) {
                return ranges[1](d.y);
            })
            .interpolate('linear');
    }

    function drawLines(svg, LineGenerator, chartData){
        var existingPaths = svg.selectAll('.'+PATH_CLASS);

        if(!existingPaths[0].length){
            svg.append('svg:path')
                .attr({
                    'd': LineGenerator(chartData),
                    'stroke': 'blue',
                    'stroke-width': 2,
                    'fill': 'none',
                    'class': PATH_CLASS
                });
            return;
        }

        existingPaths.attr({
            d: LineGenerator(chartData)
        });
    }
};

