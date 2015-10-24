This is a node graph visualization of Biblical topics. The visualization is based off the following examples from https://github.com/mbostock/d3/wiki/Force-Layout:

- http://bl.ocks.org/mbostock/929623
- http://bl.ocks.org/mbostock/950642

Nodes are discrete entities. Each is color-coded by type
    - People (Elijah, Jesus)
    - Geographical Places (Beersheba, Jezreel)
    - Things (Wells, Donkeys, Wine, Kings)

Edges are connections, color-coded by type
    - Relation Events (people to people)
    - Location Events (people/things to places)
    - Interaction Events (people/things to things)

Collections group nodes and edges
    - Dynamic
        - Families
    - Narratives
    - Motifs


# Installation

```
sudo apt-get update && sudo apt-get install -y ruby
sudo gem install sass
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