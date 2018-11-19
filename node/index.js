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

    var pureCStringFunction = webassemblyCpp.cwrap("getTestStrC", "string", []);
    var cstring = pureCStringFunction();
    console.log("Pure C String = " + cstring + "\n");

    var cMangledStrFunction = webassemblyCpp.cwrap('getCStringWithoutNameMangling', 'string', ['string']);
    var cMangledStr = cMangledStrFunction("C Mangled Str returned successfully");
    console.log("C mangled function str = " + cMangledStr + "\n");

    var num = webassemblyCpp._getNumPlus(3);
    console.log("_getNumPlus with arg 3 =");
    console.log(num);

    // WARNING: none function with C++ std types (like std::string) can be exported and used through WebAssembly,
    // see test_wasm.cpp example in c folder. Primitive types in the function signature are required (like const char *),
    // but inside it you can use std::string and any C++ std types, you just have to return and accept primitive types.  
    var stdStrFunction = webassemblyCpp.cwrap("usingStdStringInternally", "string", ["string"]);
    var stdStr = stdStrFunction("yes!! it works!");
    console.log("stdStr = " + stdStr);
    
    res.send(200, num);
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
