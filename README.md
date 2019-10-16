[![Build Status](https://travis-ci.org/mapbox/mbview.svg?branch=master)](https://travis-ci.org/mapbox/mbview)

# mbview
Serve MBTiles using Express

## quick start
Put your mbtiles in the public folder, then:

```javascript
const MBServer = require('mbserver');
const server = new MBServer();
server.init();
```
You can obtain a mapbox public token by signing up [here](https://www.mapbox.com/signup/).
