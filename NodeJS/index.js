const fs = require('fs');

const ListDir = fs.promises.opendir
var express = require('express');
var app = express();


var path = __dirname;
var port = 8080;

var Frames = [];

async function test(){
    const dir = await ListDir('./Frames');
    for await (var dirent of dir) {
        let fname = dirent.name;
        let index = parseInt(fname.substring(0,4));
        // console.log(index)
        fs.readFile('./Frames/'+fname, async (err, data) => {
            if (err) throw err;
            // console.log(data);
            Frames[index] = data;
        })
    }
    // console.log("abcde",Frames[0])
}
async function main() {
    await test()
    // console.log(Frames.length)
    // console.log(Frames[0])
}

main()

app.use(express.static(path));

app.get('*', function(req, res) {
    query = req.query;
    if (query['index'] == null) {return};
    index = parseInt(query['index']);
    console.log(index);
    console.log(Frames[index]);
    res.send(Frames[index].toString());
});
app.listen(port);