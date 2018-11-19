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

    console.log("\x1b[32m", "\Classes and structs:");
    // reset color
    console.log("\x1b[0m");

    // I declare it as an array (or list) because I declared Coordinate class as value_array, not value_object.
    // This way, although it is a Class, it works as an array when using it.
    console.log("\x1b[36m", "Constructing a Coordinate as an array (as it was defined) with 2 and 3 values");
    // reset color
    console.log("\x1b[0m");
    var coordinate = [2, 3];
    console.log("Coordinates: " + webassemblyCpp.coordinateAsString(coordinate));

    console.log("\x1b[36m", "Constructing StructExample through factory method with 69 and 'Cool name bro' params");
    // reset color
    console.log("\x1b[0m");
    var structExample = webassemblyCpp.constructStructExample(69, "Cool name bro");
    console.log("StructExample.name = " + webassemblyCpp.returnStructExampleString(structExample));

    console.log("\x1b[36m", "Constructing Vector3f with 3, 6, 9 params");
    // reset color
    console.log("\x1b[0m");
    var vec = new webassemblyCpp.Vector3f(3, 6, 9);   
    console.log("vec magnitude = " + vec.getMagnitude());
    console.log("vec x = " + vec.x);
    vec.x = 25;
    console.log("modified vec x = " + vec.x);
    console.log("vec y = " + vec.y);
    console.log("vec z = " + vec.z);
    // delete to delete from js heap, important
    vec.delete();

    console.log("\x1b[36m", "Constructing Vector3f through smart_ptr (unique_ptr) with 1, 2, 3 params");
    // reset color
    console.log("\x1b[0m");
    var smart_ptr_vec = webassemblyCpp.getNewVector3f(1, 2, 3);
    console.log("smart_ptr_vec magnitude = " + smart_ptr_vec.getMagnitude());
    // delete to delete from js heap, important
    smart_ptr_vec.delete()

    console.log();
    res.send(200, num);
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
