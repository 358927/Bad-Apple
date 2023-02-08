const fs = require('fs');
const PNG = require('pngjs').PNG;

const ListDir = fs.promises.opendir
var express = require('express');
var app = express();


var path = __dirname;
var port = 8080;

var Frames = [];

const dir = fs.opendirSync('./Frames');
const files = fs.readdirSync("./Frames");

for (var i = 1 ; i<=files.length; i++) {
    dir.read((err,dirent) => {
        if (err) {throw err}
        let fname = dirent.name;
        // console.log(fname)
        let index = parseInt(fname.substring(0,4));
        // console.log(index)
        fs.readFile('./Frames/'+fname, (err, data) => {
            if (err) {throw err}
            Frames[index] = data
            // console.log(data)
        });
    });
    // console.log(i)
};
console.log("E")
console.log(Frames)

app.use(express.static(path));

app.get('*', function(req, res) {
    query = req.query;
    if (query['index'] == null) {return};
    index = parseInt(query['index']);
    console.log(index);
    // res.send(Frames[index]);
    if (index == -1) {
        new PNG({ filterType: 4 }).parse(Frames[0], function (error, data) {
            if (error) {throw error};
            res.send([data.width,data.height]);
        });
        return
    }

    new PNG({ filterType: 4,colorType: 2}).parse(Frames[index], function (error, data) {
        if (error) {throw error};
        res.send(data.data);
    });
});
app.listen(port);