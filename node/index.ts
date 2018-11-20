import * as application from 'express';
import * as path from "path";

process.chdir(path.join(__dirname, "wasm/cpp"));
import * as webassemblyCpp from "./wasm/cpp/cpptest.js";

const app: any = application();

app.get('/cpp/:param', function (req, res) {
    let output: any;

    switch(req.params["param"]){
        case 'pureCString': // Pure C string example
            const pureCStringFunction: any = webassemblyCpp.cwrap("getTestStrC", "string", []);
            const cstring: string = pureCStringFunction();
            output = cstring;
        break;
        case 'cMangledFunction': // C Mangled function
            const cMangledStrFunction: any = webassemblyCpp.cwrap('getCStringWithoutNameMangling', 'string', ['string']);
            const cMangledStr: string = cMangledStrFunction("C Mangled Str returned successfully"); // Seems like it can be partially
            output = cMangledStr;
        break;
        case 'getNumPlus': // sum numbers
            const num: number = webassemblyCpp._getNumPlus(3);
            output = num;
        break;
        case 'stdStringSignature': // C++ :D string param 
            const str: string = webassemblyCpp.stdStringSignature("yes!! it works!"); // we should pass string throught the http
            output = str;
        break;
        case 'coordinateAsString': // Coordinates (aka point) creating and printing
            // I declare it as an array (or list) because I declared Coordinate class as value_array, not value_object.
            // This way, although it is a Class, it works as an array when using it.
            console.log("\x1b[36m", "Constructing a Coordinate as an array (as it was defined) with 2 and 3 values");
            const coordinate: Array<number> = [2, 3];
            const CAS: string = webassemblyCpp.coordinateAsString(coordinate);
            output = CAS;
        break;
        case 'constructStructExample': // Constructing object through function (factory method)
            console.log("\x1b[36m", "Constructing StructExample through factory method with 69 and 'Cool name bro' params");
            const structExample: any = webassemblyCpp.constructStructExample(69, "Cool name bro");
            output = webassemblyCpp.returnStructExampleString(structExample);
            // delete to delete from emscripten heap, important
            structExample.delete();
        break;
        case 'constructVector3f': // Constructing Vector3f with 3, 6, 9 params
            console.log("\x1b[36m", "Constructing Vector3f with 3, 6, 9 params");       
            let vec: any = new webassemblyCpp.Vector3f(3, 6, 9);   
            output = `vecX = ${vec.x} <br/> vecY = ${vec.y} <br/> vecZ = ${vec.z} <br/>`
            output += `vec magnitude = ${vec.getMagnitude()} <br/>`
            vec.x = 1;
            vec.y = 2;
            output += `\nvecX = ${vec.x} <br/> vecY = ${vec.y} <br/> vecZ = ${vec.z} <br/>`
            // delete to delete from emscripten heap, important
            vec.delete();
        break;
        case 'getNewVector3f': // Constructing Vector3f through smart_ptr (unique_ptr) with 1, 2, 3 params
            console.log("\x1b[36m", "Constructing Vector3f through smart_ptr (unique_ptr) with 1, 2, 3 params");
            const smart_ptr_vec: any = webassemblyCpp.getNewVector3f(1, 2, 3);
            output = smart_ptr_vec.getMagnitude();
            // delete to delete from emscripten heap, important
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
