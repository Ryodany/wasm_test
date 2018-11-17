var express = require('express');
var webassembly = require("webassembly");

var app = express();

var $test = webassembly.load("../cpp/test.wasm")

app.get('/', function (req, res) {
    $test.then(_=>{

        res.send(module.exports.getTestStr());
    })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
