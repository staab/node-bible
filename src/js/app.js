var d3 = require('d3'),
    createCanvas = require('./graph/canvas'),
    canvas;

canvas = createCanvas({
    parent: 'body',
    width: 960,
    height: 600
});

canvas.svg.on('mousedown', function mousedown() {
    var point = d3.mouse(this),
        node = {x: point[0], y: point[1]},
        n = canvas.layout.nodes().push(node);

    // add links to any nearby nodes
    canvas.layout.nodes().forEach(function(target) {
        var x = target.x - node.x,
            y = target.y - node.y;

        if (Math.sqrt(x * x + y * y) < 30) {
            canvas.layout.links().push({source: node, target: target});
        }
    });

    canvas.draw();
});

canvas.draw();

