This is a node graph visualization of Biblical topics. The visualization is based off http://bl.ocks.org/mbostock/929623

# Installation

```
npm install
```

# Building

```
./build.sh
```

# Running in development

```
npm install -g http-server nodemon
nodemon -w src --exec "./build.sh" &
http-server dist 8080
```