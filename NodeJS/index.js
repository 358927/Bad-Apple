const fs = require('fs');
const PNG = require('pngjs').PNG;

const ListDir = fs.promises.opendir
var express = require('express');
var app = express();


var path = __dirname;
var port = 8080;

var Frames = [];
var ParsedFrames = [];


const dir = fs.opendirSync('../Frames');
const files = fs.readdirSync("../Frames");

var Prom = new Promise(function(resolve,reject) {
    Promises = [];
    try {
        for (var i = 1 ; i<=files.length; i++) {
            dir.read((err,dirent) => {
                Promises.push(new Promise(function(res,rej) {
                    if (err) {throw err}
                    let fname = dirent.name;
                    // console.log(fname)
                    let index = parseInt(fname.substring(0,4));
                    // console.log(index)
                    fs.readFile('../Frames/'+fname, (err, data) => {
                        if (err) {throw err}
                        Frames[index] = data
                        resolve()
                        // console.log(data)
                    });
                }));
            });
            // console.log(i)
        };
    }
    finally {
        dir.close();
    };
});



Frames.forEach(async (Frames,i) => {
    new PNG({ filterType: 4 }).parse(Frames[0], function (error, data) {
        if (error) {throw error};
        ParsedFrames.push(data.data.toString('hex'));
        console.log("e");
    });    
});

console.log("E")
console.log(Frames)

app.use(express.static(path));

app.get('*', function(req, res) {
    query = req.query;
    if (query['index'] == null) {return};

    if (query['index'] == "all") {
        var tab = []
        
        new PNG({ filterType: 4 }).parse(Frames[0], function (error, data) {
            if (error) {throw error};
            tab.push(data.data.toString('hex'));
            console.log("e");
        });
        while (tab.length != 1) {let _ = 1}
        // while (tab.length != Frames.length) {let _ = 1}
        res.send(JSON.stringify(tab))
        
        return
    }

    index = parseInt(query['index']);
    // console.log(index);
    // res.send(Frames[index]);
    if (index == -1) {
        new PNG({ filterType: 4 }).parse(Frames[0], function (error, data) {
            if (error) {throw error};
            res.send([Frames.length,data.width,data.height]);
        });
        return
    }
    if (index < -1 || index > Frames.length-1) {res.send("invalid index"); return;}
    new PNG({ filterType: 4,colorType: 2}).parse(Frames[index], function (error, data) {
        if (error) {throw error};
        // console.log(data.data.toString('hex'));
        res.send(data.data.toString('hex'));
    });
});
app.listen(port);