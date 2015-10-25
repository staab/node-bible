"use strict";

var _ = require('lodash'),
    utils = require('./utils'),
    demoData = require('./demo-data');

function GraphData() {
    var self = this,
        data = self.getData();

    self.nodes = [];
    self.links = [];

    self.setData(data.nodes, data.links);
}


GraphData.prototype.getData = function getData() {
    return demoData;
};

GraphData.prototype.setData = function setData(nodes, links) {
    var self = this;

    self.validateData(nodes, links);

    self.nodes = self.normalizeNodes(nodes, links);
    self.links = self.normalizeLinks(nodes, links);
};

GraphData.prototype.validateData = function validateData(nodes, links) {
    _.forEach(nodes, function (node) {
        utils.assertIn(node, ['name', 'type', 'x', 'y']);

        console.assert(
            _.includes(['Person', 'Thing', 'Place'], node.type),
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
    });

    _.forEach(links, function (link) {
        console.assert(
            _.includes(nodes, link.source),
            _.template("Invalid node, ${node}", {node: JSON.stringify(link.source)})
        );

        console.assert(
            _.includes(nodes, link.target),
            _.template("Invalid node, ${node}", {node: JSON.stringify(link.target)})
        );
    });
};

GraphData.prototype.normalizeNodes = function normalizeNodes(nodes, links) {
    return nodes;
};

GraphData.prototype.normalizeLinks = function normalizeLinks(nodes, links) {
    return _.uniq(links, function (link) {
        return utils.objectId(link.source) + utils.objectId(link.target);
    });
};

module.exports = GraphData;