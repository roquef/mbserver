const fs = require('fs');
const path = require('path');

class MBServer {
    constructor(options) {
        let default_options = {
            port: 3000,
            data_path: 'public',
            preview: {
                basemap: 'mapbox://styles/roquefsd/cjzhb3q4c2x0p1cpdymohva94',
                center: [0, 0],
                zoom: 0
            }
        };

        this.options = Object.assign(default_options, options);
        this.options.absolute_data_path = path.resolve(__dirname, this.options.data_path);
        this.MBView = require('./mbview');
    }

    init() {
        this.checkData();
    }

    checkData() {
        this.walk(this.options.absolute_data_path, (err, res) => {
            if (!err) {
                this.mbtiles = res;
                try {
                    this.mbtiles.forEach((f) => { fs.statSync(f).isFile(); });
                    this.serve();
                } catch (e) {
                    return console.error(e);
                }
            }
            else {
                throw new Error(`Error reading path:\n ${err}`);
            }
        });
    }

    serve() {
        let params = {
            center: this.options.preview.center,
            mbtiles: this.mbtiles,
            port: this.options.port,
            zoom: this.options.preview.zoom,
            quiet: true,
            basemap: this.options.preview.basemap,
            accessToken: this.options.access_token
        };

        this.MBView.serve(params, (err, config) => {
            if(!err) {
                console.log(`MBServer Listening @${this.options.port}`);
            }
        });
    }

    walk(dir, done) {
        var results = [];
        fs.readdir(dir, (err, list) => {
            if (err) return done(err);
            var pending = list.length;
            if (!pending) return done(null, results);
            list.forEach((file) => {
                file = path.resolve(dir, file);
                fs.stat(file, (err, stat) => {
                    if (stat && stat.isDirectory()) {
                        this.walk(file, (err, res) => {
                            results = results.concat(res);
                            if (!--pending) done(null, results);
                        });
                    } else {
                        results.push(file);
                        if (!--pending) done(null, results);
                    }
                });
            });
        });
    };
}

const server = new MBServer({
    access_token: process.argv[2]
});
server.init();
