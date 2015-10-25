#/bin/bash

nodemon -w src -e html,js,scss -x ./build.sh &
http-server dist 8080