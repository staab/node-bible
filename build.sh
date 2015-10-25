#!/bin/bash

rm -rf ./dist
mkdir -p ./dist/js ./dist/css

# Html
cp src/index.html ./dist/index.html

# Css
scss -I src/css src/css/bundle.scss dist/css/bundle.css

# Js
browserify \
    node_modules/d3/d3.js \
    node_modules/lodash/index.js \
    src/js/demo-data.js \
    src/js/graph-data.js \
    src/js/graph-svg.js \
    src/js/utils.js \
    src/js/app.js \
    > ./dist/js/bundle.js
