"use strict";

var _ = require('lodash'),
    d3 = require('d3'),
    utils = require('./utils'),
    graphing = require('./graph-svg'),
    GraphData = require('./graph-data');

function GraphManager(parent) {
    var self = this;

    // Create Graph
    self.graph = new graphing.Graph({
        parent: parent,
        width: parent.offsetWidth,
        height: parent.offsetHeight,
        layout: graphing.layouts.force
    });

    // Create data manager
    self.graphData = new GraphData();

    // Bind events
    self.bindEvents();

    // Populate data
    self.syncData();
}

GraphManager.prototype.syncData = function syncData() {
    var self = this;

    self.graph.layout.nodes(self.graphData.nodes);
    self.graph.layout.links(self.graphData.links);
    self.graph.draw();
};

GraphManager.prototype.setNodes = function setNodes(nodes) {
    var self = this;

    self.graphData.setData(nodes, self.graphData.links);
    self.syncData();
};

GraphManager.prototype.setLinks = function setLinks(links) {
    var self = this;

    self.graphData.setData(self.graphData.nodes, links);
    self.syncData();
};

GraphManager.prototype.addNode = function addNode(node) {
    var self = this;

    self.setNodes(_.union(self.graphData.nodes, [node]));
};

GraphManager.prototype.addLink = function addLink(link) {
    var self = this;

    self.setLinks(_.union(self.graphData.links, [link]));
};

GraphManager.prototype.bindEvents = function bindEvents() {
    var self = this,
        dragFrom;

    function mousePoint(target) {
        var pos = d3.mouse(target);

        return {x: pos[0], y: pos[1]};
    }

    function getNodesAt(point) {
        var nodes = self.graph.layout.nodes(),
            radius;

        if (!nodes.length) {
            return false;
        }

        radius = self.graph.svg.selectAll(".node circle").attr('r');

        return self.graph.svg.selectAll(".node").filter(function (node) {
            return utils.circleContains(node, radius, point);
        });
    }

    self.graph.svg.on('mousedown', function mousedown() {
        // Unpack the group and grab
        dragFrom = _.first(_.first(getNodesAt(mousePoint(this))));
    });

    self.graph.svg.on('mouseup', function mouseup() {
        var nodes = getNodesAt(mousePoint(this)),
            node =  _.first(_.first(nodes));

        if (dragFrom && dragFrom === node) {
            // Toggle class
            nodes.classed('selected', function () {
                return !d3.select(this).classed('selected');
            });
        } else if (dragFrom && node) {
            // Add a link
            self.addLink({
                source: dragFrom.__data__,
                target: node.__data__,
                annotation: function () { return "Fake Annotation"; },
                reference: "Fake Reference",
            });
        }
    });
};

function App() {
    var self = this;

    self.graphManager = new GraphManager(
        document.querySelector('#primary-content')
    );
}

// Expose stuff globally for use in dom and console
window.app = new App();
window._ = _;
window.utils = utils;
