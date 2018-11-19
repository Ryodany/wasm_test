 express = require('express');
 app = express();

app.get('/c', function (req, res) {
     webassemblyC = require("webassembly");
     $testc = webassemblyC.load("./wasm/c/ctest.wasm");

    $testc.then(module=>{
         strPointer = module.exports.getTestStrC(); 
         str = module.memory.getString(strPointer);

        console.log(str);
        res.send(200, str);
    })
});

app.get('/cpp/:param', function (req, res) {
    const path = require("path");
    process.chdir(path.join(__dirname, "wasm/cpp"));
    const webassemblyCpp = require("./wasm/cpp/cpptest.js");

    let output; //any

    switch(req.params["param"]){
        case 'pureCString': // Pure C string example
            const pureCStringFunction = webassemblyCpp.cwrap("getTestStrC", "string", []);
            const cstring = pureCStringFunction();
            output = cstring;
        break;
        case 'cMangledFunction': // C Mangled function
            const cMangledStrFunction = webassemblyCpp.cwrap('getCStringWithoutNameMangling', 'string', ['string']);
            const cMangledStr = cMangledStrFunction("C Mangled Str returned successfully"); // Seems like it can be partially
            output = cMangledStr;
        break;
        case 'getNumPlus': // sum numbers
            const num = webassemblyCpp._getNumPlus(3);
            output = num;
        break;
        case 'stdStringSignature': // C++ :D string param 
            const str = webassemblyCpp.stdStringSignature("yes!! it works!"); // we should pass string throught the http
            output = str;
        break;
        case 'coordinateAsString': // Coordinates (?)
            // I declare it as an array (or list) because I declared Coordinate class as value_array, not value_object.
            // This way, although it is a Class, it works as an array when using it.
            console.log("\x1b[36m", "Constructing a Coordinate as an array (as it was defined) with 2 and 3 values");
            const coordinate = [2, 3];
            const CAS = webassemblyCpp.coordinateAsString(coordinate);
            output = CAS;
        break;
        case 'constructStructExample': // idk what is it exactly
            console.log("\x1b[36m", "Constructing StructExample through factory method with 69 and 'Cool name bro' params");
            const structExample = webassemblyCpp.constructStructExample(69, "Cool name bro");
            output = webassemblyCpp.returnStructExampleString(structExample);
        break;
        case 'constructVector3f': // Constructing Vector3f with 3, 6, 9 params
            console.log("\x1b[36m", "Constructing Vector3f with 3, 6, 9 params");       
            vec = new webassemblyCpp.Vector3f(3, 6, 9);   
            output = `vecX = ${vec.x} <br/> vecY = ${vec.y} <br/> vecZ = ${vec.z} <br/>`
            output += `vec magnitude = ${vec.getMagnitude()} <br/>`
            // delete to delete from js heap, important
            vec.delete();
        break;
        case 'getNewVector3f': // Constructing Vector3f through smart_ptr (unique_ptr) with 1, 2, 3 params
            console.log("\x1b[36m", "Constructing Vector3f through smart_ptr (unique_ptr) with 1, 2, 3 params");
            const smart_ptr_vec = webassemblyCpp.getNewVector3f(1, 2, 3);
            output = smart_ptr_vec.getMagnitude();
            // delete to delete from js heap, important
            smart_ptr_vec.delete()
        break;
        default:
            output = ":D";
    }
    res.send(200, output);
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
