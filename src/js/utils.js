"use strict";

var _ = require('lodash'),
    d3 = require('d3');

// ====================================
// Data Manipulation
// ====================================

function ifArray(value, fn) {
    if (Array.isArray(value)) {
        return _.map(value, fn);
    }
    return fn(value);
}

function assertIn(obj, paths) {
    _.forEach(paths, function (path) {
        console.assert(
            _.get(obj, path) !== undefined,
            "Object must have " + path
        );
    });
}

// ====================================
// DOM Manipulation
// ====================================

function onResize(fn) {
    window.addEventListener("resize", _.throttle(function () {
        fn(window.innerWidth, window.innerHeight);
    }, 50));

    // Fire it initially as well
    fn(window.innerWidth, window.innerHeight);
}

function mousePos(element) {
    var point = d3.mouse(element);

    return {x: point[0], y: point[1]};
}

// ====================================
// MATH
// ====================================

function circleContains(target, radius, point) {
    var x = target.x - point.x,
        y = target.y - point.y;

    return Math.sqrt(x * x + y * y) < radius;
}

module.exports = {
    ifArray: ifArray,
    assertIn: assertIn,
    onResize: onResize,
    mousePos: mousePos,
    circleContains: circleContains
};