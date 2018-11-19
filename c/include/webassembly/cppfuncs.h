#pragma once
#include "webassembly/export.h"
#include "webassembly/emscripten.h"

/*
    To be able to use C++ functions you just need to use EMSCRIPTEN_BINDINGS.
    Ref: 
        https://kripken.github.io/emscripten-site/docs/api_reference/bind.h.html
        https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/embind.html#embind

*/
WASM_FUNCTION_EXPORT std::string stdStringSignature(const std::string &firstStr);

EMSCRIPTEN_BINDINGS(test)
{
    emscripten::function("stdStringSignature", &stdStringSignature);
}