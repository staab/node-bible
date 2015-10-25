"use strict";

var _ = require('lodash'),
    utils = require('./utils'),
    data = require('./demo-data');

function GraphData(nodes, links) {
    var self = this;

    self.nodes = self.validateNodes(nodes);
    self.links = self.validateLinks(links);
}

GraphData.prototype.validateNodes = function validateNodes(nodes) {
    return _.forEach(nodes, function (node) {
        utils.assertIn(node, ['name', 'type', 'x', 'y']);

        console.assert(
            node.type in ['Person', 'Thing', 'Place'],
            _.template('Invalid node type, ${type}.')(node)
        );

        console.assert(
            _.isNumber(node.x),
            _.template("Invalid x value, ${x}")(node)
        );

        console.assert(
            _.isNumber(node.y),
            _.template("Invalid y value, ${y}")(node)
        );

        return node;
    });
};

GraphData.prototype.validateLinks = function validateLinks(links) {
    Check that every link has two valid nodes, and remove duplicates
};


module.exports = GraphData;