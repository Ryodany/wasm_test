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

    console.log("\x1b[32m", "\nNew stuff:");
    // reset color
    console.log("\x1b[0m");

    var str = webassemblyCpp.stdStringSignature("yes!! it works!");
    console.log(str);


    console.log();
    res.send(200, num);
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
