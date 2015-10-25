"use strict";

var d3 = require('d3'),
    _ = require('lodash'),
    utils = require('./utils');

function Graph(opts) {
    var self = this;

    utils.assertIn(opts, ['parent', 'width', 'height', 'layout']);

    // Add the main svg and rectangle
    self.svg = d3.select(opts.parent).append('svg');
    self.svg.append("rect");

    self.setLayout(opts.layout);
    self.setSize(opts.width, opts.height);
}

Graph.prototype.setSize = function setSize(width, height) {
    var self = this;

    self.svg.attr('width', width).attr('height', height);
    self.svg.select('rect').attr('width', width).attr('height', height);
    self.layout.size([width, height]);
};

Graph.prototype.setLayout = function setLayout(layoutFn) {
    var self = this;

    self.layout = layoutFn(self);
};

Graph.prototype.draw = function draw() {
    var self = this,
        links = self.svg.selectAll(".link").data(self.layout.links()),
        nodes = self.svg.selectAll(".node").data(self.layout.nodes());

    (function drawLinks() {
        links.enter().insert('line', '.node')
            .attr('class', 'link')
            .append('svg:title')
            .text(function (d) { return d.annotation(d); });

        links.exit().remove();
    }());

    (function drawNodes() {
        var nodeGroup;

        nodeGroup = nodes.enter().append('g')
            .attr('class', 'node');

        nodeGroup.append('circle')
            .attr('r', 15);

        nodeGroup.append('text')
            .attr("dx", 20)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

        nodes.exit().remove();
    }());

    self.layout.start();
};

Graph.prototype.tick = function tick() {
    var self = this;

    self.svg.selectAll(".link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    self.svg.selectAll(".node").attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
};

module.exports = {
    Graph: Graph,
    layouts: {
        force: function force(graph) {
            return d3.layout.force()
                .linkDistance(200)
                .charge(-400)
                .on("tick", graph.tick.bind(graph));
        }
    }
};