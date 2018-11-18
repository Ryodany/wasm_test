var express = require('express');
var webassembly = require("webassembly");

var app = express();
var $test = webassembly.load("../c/test.wasm");

app.get('/', function (req, res) {
    $test.then(module=>{
        var strPointer = module.exports.getTestStr();        
        console.log(module.memory.getString(strPointer))
        res.send(200, module.memory.getString(strPointer));
    })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
