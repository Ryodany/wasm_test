var express = require('express');
var app = express();

app.get('/c', function (req, res) {
    var webassemblyC = require("webassembly");
    var $testc = webassemblyC.load("./wasm/c/ctest.wasm");

    $testc.then(module=>{
        var strPointer = module.exports.getTestStrC(); 
        var str = module.memory.getString(strPointer);

        console.log(str);
        res.send(200, str);
    })
});

app.get('/cpp', function (req, res) {
    const path = require("path");
    process.chdir(path.join(__dirname, "wasm/cpp"));
    const webassemblyCpp = require("./wasm/cpp/cpptest.js")

    var cMangledStrFunction = webassemblyCpp.cwrap('getCStringWithoutNameMangling', 'string', ['string']);
    cMangledStr = cMangledStrFunction("C Mangled Str returned successfully");
    console.log(cMangledStr + "\n");

    var num = webassemblyCpp._getNumPlus(3);
    console.log("_getNumPlus with arg 3 =");
    console.log(num);

    // WARNING, this does not work even if exported with WASM_FUNCTION_EXPORT macro:
    // var str = webassemblyCpp._getTestStrCpp();
    // C++ name-mangled functions do not work. Neither do std libraries and therefore std functions.
    // They work if called from main function in C++ module.

    // WARNING, functions compiled with emcc even if they are C code won't be found:
    // var str = webassemblyCpp._getTestStrC();
    
    res.send(200, num);
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
