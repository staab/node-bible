"use strict";

var _ = require('lodash'),
    d3 = require('d3'),
    utils = require('./utils'),
    createCanvas = require('./graph/canvas'),
    demoData = require('./demo-data'),
    canvas,
    dragFrom;

function getNodesAt(canvas, point) {
    var nodes = canvas.layout.nodes(),
        radius;

    if (!nodes.length) {
        return false;
    }

    radius = canvas.svg.selectAll(".node circle").attr('r');

    return canvas.svg.selectAll(".node").filter(function (node) {
        return utils.circleContains(node, radius, point);
    });
}

utils.onResize(function () {
    var parent = document.querySelector('#primary-content');

    if (canvas) {
        canvas.svg.remove();
    }
    console.log(parent);

    canvas = createCanvas({
        parent: parent,
        width: parent.offsetWidth,
        height: parent.offsetHeight
    });
});

canvas.svg.on('mousedown', function mousedown() {
    var pos = d3.mouse(this),
        point = {x: pos[0], y: pos[1]},
        nodes = getNodesAt(canvas, point);

    // Unpack the group and grab
    dragFrom = _.first(_.first(nodes));
});

canvas.svg.on('mouseup', function mouseup() {
    var pos = d3.mouse(this),
        point = {x: pos[0], y: pos[1]},
        nodes = getNodesAt(canvas, point),
        node =  _.first(_.first(nodes));

    if (dragFrom && dragFrom === node) {
        // Toggle class
        nodes.classed('selected', function () {
            return !d3.select(this).classed('selected');
        });
    } else if (dragFrom && node) {
        // Add an edge
        canvas.addEdge(dragFrom.__data__, node.__data__);
    }
});

// Add demo data
_.forEach(demoData.nodes, function (node) {
    console.log(node);
    canvas.addNode(node);
});
_.forEach(demoData.edges, function (edge) {
    canvas.addEdge(edge);
});

canvas.draw();

