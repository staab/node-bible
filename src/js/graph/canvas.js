"use strict";

var d3 = require('d3'),
    _ = require('lodash');

function assertIn(obj, paths) {
    _.forEach(paths, function (path) {
        console.assert(
            _.get(obj, path) !== undefined,
            "Object must have " + path
        );
    });
}

function createLayout(svg, width, height) {
    return d3.layout.force()
        .size([width, height])
        .nodes([])
        .linkDistance(200)
        .charge(-400)
        .on("tick", function tick() {
            svg.selectAll(".link")
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            svg.selectAll(".node").attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });
}

function createDraw(svg, layout) {
    return function draw () {
        var link = svg.selectAll(".link").data(layout.links()),
            node = svg.selectAll(".node").data(layout.nodes()),
            nodeGroup;

        link.enter().insert('line', '.node')
            .attr('class', 'link')
            .append('svg:title')
            .text(function (d) { return d.annotation(d); });

        link.exit().remove();

        nodeGroup = node.enter().append('g')
            .attr('class', 'node');

        nodeGroup.append('circle')
            .attr('r', 15);

        nodeGroup.append('text')
            .attr("dx", 20)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

        node.exit().remove();

        layout.start();
    };
}

function createCanvas(opts) {
    var svg,
        layout,
        draw;

    assertIn(opts, ['parent', 'width', 'height']);

    // Add the main svg
    svg = d3.select(opts.parent).append('svg')
        .attr('width', opts.width)
        .attr('height', opts.height);

    // Add a rectangle to add stuff to
    svg.append("rect")
        .attr("width", opts.width)
        .attr("height", opts.height);

    // Create a layout rule
    layout = createLayout(svg, opts.width, opts.height);

    // Create a drawing function
    draw = createDraw(svg, layout);

    return {
        svg: svg,
        layout: layout,
        draw: draw,
        addNode: function addNode(node) {
            layout.nodes().push(_.defaults(node, {x: 0, y: 0}));

            draw();
        },
        addEdge: function addEdge(edge) {
            var duplicate;

            // Avoid duplicate edges
            duplicate = _.find(layout.links(), function (data) {
                return (
                    (data.source === edge.source && data.target === edge.target) ||
                    (data.source === edge.target && data.target === edge.source)
                );
            });

            if (duplicate) {
                return;
            }

            // Create the edge
            layout.links().push(edge);

            draw();
        }
    };
}

module.exports = createCanvas;