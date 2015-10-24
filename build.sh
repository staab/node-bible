#!/bin/bash

rm -rf ./dist
mkdir ./dist
mkdir ./dist/js

# Html
cp src/index.html ./dist/index.html

# Js
browserify \
    node_modules/d3/d3.js \
    node_modules/lodash/index.js \
    src/js/graph/canvas.js \
    src/js/utils.js \
    src/js/app.js \
    src/js/demo-data.js \
    > ./dist/js/bundle.js
