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

    self.setSize(opts.width, opts.height);
    self.setLayout(opts.layout);
}

Graph.prototype.setSize = function setSize(width, height) {
    var self = this;

    self.svg.attr('width', width).attr('height', height);
    self.svg.select('rect').attr('width', width).attr('height', height);
};

Graph.prototype.setLayout = function setLayout(layout) {
    var self = this;

    self.layout = layout(self, self.svg.attr('width'), self.svg.attr('height'));
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

Graph.prototype.addNode = function addNode(node) {
    var self = this;

    self.layout.nodes().push(node);

    self.draw();
};

Graph.prototype.addLink = function addLink(link) {
    var self = this,
        duplicate;

    // Avoid duplicate links
    duplicate = _.find(self.layout.links(), function (data) {
        return (
            (data.source === link.source && data.target === link.target) ||
            (data.source === link.target && data.target === link.source)
        );
    });

    if (duplicate) {
        return;
    }

    // Create the link
    self.layout.links().push(link);

    self.draw();
};

module.exports = {
    Graph: Graph,
    layouts: {
        force: function force(graph, width, height) {
            return d3.layout.force()
                .size([width, height])
                .linkDistance(200)
                .charge(-400)
                .on("tick", graph.tick.bind(graph));
        }
    }
};