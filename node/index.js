var express = require('express');
var app = express();

var webassemblyC = require("webassembly");
var $test = webassemblyC.load("../c/test.wasm");

const path = require("path");
process.chdir(path.join(__dirname, "wasm"));
const webassemblyCpp = require("./wasm/cpptest.js");

/*const WA = WebAssembly, env = {
        memoryBase: 0,
        tableBase: 0,
        memory: new WA.Memory({initial: 256}),
        table: new WA.Table({initial: 0, element: 'anyfunc'})
    };*/
    
app.get('/c', function (req, res) {
    $test.then(module=>{
        var strPointer = module.exports.getTestStr();        
        console.log(module.memory.getString(strPointer))
        res.send(200, module.memory.getString(strPointer));
    })
});

app.get('/cpp', function (req, res) {
    /*webassemblyCpp.loadWebAssembly().then(wasm => function(){
        var strPointer = wasm.exports.getTestStr();
        console.log(wasm.memory.getString(strPointer));
        res.send(200, module.memory.getString(strPointer));
    });*/

    webassemblyCpp._getTestStrCpp();
    //console.log(webassemblyCpp._getTestStrCpp());
    //console.log(webassemblyCpp._getTestStrCpp());
    
    /*cppTestCode = new Uint8Array(require('fs').readFileSync('cpptest.wasm'))
    WA.compile(cppTestCode).then(m => {
        return new WA.Instance(m, {env: WA.env})
    }).then(i => {
        console.log(i.exports._getTextStrCpp())
        console.log(i.exports._getTextStrC())
    });*/
    //res.send(200, str);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
