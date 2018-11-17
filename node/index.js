var express = require('express');
var webassembly = require("webassembly");

var app = express();
var $test = webassembly.load("../cpp/test.wasm");

app.get('/', function (req, res) {
    $test.then(module=>{
        const str = module.exports.getTestStr();
        console.log(str)
        res.send(200, str);
    })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
