[![Build Status](https://travis-ci.org/mapbox/mbview.svg?branch=master)](https://travis-ci.org/mapbox/mbview)

# mbview

Serve MBTiles via REST using Express

![demo](https://raw.githubusercontent.com/mapbox/mbview/master/demo.gif)

```bash
% npm install
% export MAPBOX_ACCESS_TOKEN='pk.0000.1111' # replace value with your mapbox public access token
% node cli.js --port 9000 ~/roads.mbtiles ~/taco-places.mbtiles
```
You can obtain a mapbox public token by signing up [here](https://www.mapbox.com/signup/).
