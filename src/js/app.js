"use strict";

var _ = require('lodash'),
    d3 = require('d3'),
    ui = require('./ui'),
    utils = require('./utils'),
    graphing = require('./graph-svg'),
    GraphData = require('./graph-data'),
    graphData = new GraphData(),
    app,
    graph,
    dragFrom;

function App() {
    var parent = document.querySelector('#primary-content');

    graph = new graphing.Graph({
        parent: parent,
        width: parent.offsetWidth,
        height: parent.offsetHeight,
        layout: graphing.layouts.force
    });

    graph.layout.nodes(graphData.nodes);
    graph.layout.links(graphData.links);

    graph.draw();
}

app = new App();



// function getNodesAt(canvas, point) {
//     var nodes = canvas.layout.nodes(),
//         radius;

//     if (!nodes.length) {
//         return false;
//     }

//     radius = canvas.svg.selectAll(".node circle").attr('r');

//     return canvas.svg.selectAll(".node").filter(function (node) {
//         return utils.circleContains(node, radius, point);
//     });
// }

// utils.onResize(function () {
//     var parent = document.querySelector('#primary-content');

//     graph.setSize(parent.offsetWidth, parent.offsetHeight);
// });

// canvas.svg.on('mousedown', function mousedown() {
//     var pos = d3.mouse(this),
//         point = {x: pos[0], y: pos[1]},
//         nodes = getNodesAt(canvas, point);

//     // Unpack the group and grab
//     dragFrom = _.first(_.first(nodes));
// });

// canvas.svg.on('mouseup', function mouseup() {
//     var pos = d3.mouse(this),
//         point = {x: pos[0], y: pos[1]},
//         nodes = getNodesAt(canvas, point),
//         node =  _.first(_.first(nodes));

//     if (dragFrom && dragFrom === node) {
//         // Toggle class
//         nodes.classed('selected', function () {
//             return !d3.select(this).classed('selected');
//         });
//     } else if (dragFrom && node) {
//         // Add an edge
//         canvas.addEdge(dragFrom.__data__, node.__data__);
//     }
// });

// window.g = {
//     filterNodesByType: function filterNodesByType(element) {
//         var value = element.querySelector(':checked').getAttribute('value');

//         canvas.svg.selectAll(".link").data(_.filter(function (d) {
//             return d.source.type === value && d.target.type === value;
//         });

//         canvas.svg.selectAll(".node").data(_.filter(function (d) {
//             return d.type === value;
//         });

//         canvas.draw();
//     }
// };
