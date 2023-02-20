const fs = require('fs');
var screenshot = require('desktop-screenshot');
var express = require('express');
var app = express();


var path = __dirname;
console.log(path)
var port = 100;

app.use(express.static(path));

app.get('*', function(req, res) {
    let query = req.query;
    if (query['name'] == null) {return};
    
    let name = query['name']
    
    
    screenshot(path+"\\Output\\"+name+".png", function(error, complete) {
        if(error) {
            res.send("error");
            console.log(name);
        }else
            res.send("Success");
    });

});
app.listen(port);