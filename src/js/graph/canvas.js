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
        .linkDistance(60)
        .charge(-120)
        .on("tick", function tick() {
            svg.selectAll(".link").attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            svg.selectAll(".node").attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });
}

function createDraw(svg, layout) {
    return function draw () {
        var link = svg.selectAll(".link").data(layout.links()),
            node = svg.selectAll(".node").data(layout.nodes());

        link.enter().insert('line', '.node')
            .attr('class', 'link');

        link.exit().remove();

        node.enter().insert('circle', '.cursor')
            .attr('class', 'node')
            .attr('r', 15);

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
        addNode: function addNode(point) {
            layout.nodes().push(point);

            draw();
        },
        addEdge: function addEdge(source, target) {
            var duplicate;

            // Avoid duplicate edges
            duplicate = _.find(layout.links(), function (data) {
                return (
                    (data.source === source && data.target === target) ||
                    (data.source === target && data.target === source)
                );
            });

            if (duplicate) {
                return;
            }

            // Create the edge
            layout.links().push({
                source: source,
                target: target
            });

            draw();
        }
    };
}

module.exports = createCanvas;