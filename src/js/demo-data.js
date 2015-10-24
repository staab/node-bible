var _ = require('lodash'),
    nodes,
    edges;

nodes = {
    elijah: {name: 'Elijah', type: 'Person'},
    ishmael: {name: 'Ishmael', type: 'Person'},
    bush: {name: 'Bush', type: 'Thing'},
    beersheba: {name: 'Beersheba', type: 'Place'},
};

edges = [
    {
        source: nodes.elijah,
        target: nodes.bush,
        annotation: _.template("${source.name} sits under a ${target.name}"),
        reference: "1 Kings 19:5"
    },
    {
        source: nodes.elijah,
        target: nodes.beersheba,
        annotation: _.template("${source.name} goes to ${target.name} and asks to die"),
        reference: "1 Kings 19:3,4"
    },
    {
        source: nodes.ishmael,
        target: nodes.bush,
        annotation: _.template("${source.name} sits under a ${target.name}"),
        reference: "Genesis 21:15"
    },
    {
        source: nodes.ishmael,
        target: nodes.beersheba,
        annotation: _.template("${source.name} goes to ${target.name} and waits to die"),
        reference: "Geneis 21:15-16"
    }
];

module.exports = {
    nodes: nodes,
    edges: edges
};