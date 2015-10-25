"use strict";

var React = require('react'),
    ReactDom = require('react-dom');

var Hello = React.createClass({displayName: 'Hello',
    render: function() {
        return React.createElement("div", null, "Hello ", this.props.name);
    }
});

function init() {
    ReactDom.render(
        React.createElement(Hello, {name: "World"}),
        document.getElementById('example')
    );
}

module.exports = init;