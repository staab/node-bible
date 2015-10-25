#!/bin/bash

rm -rf ./dist
mkdir -p ./dist/js ./dist/css

# Html
cp src/index.html ./dist/index.html

# Css
scss -I src/css src/css/bundle.scss dist/css/bundle.css

# Js
browserify src/js/app.js > ./dist/js/bundle.js
