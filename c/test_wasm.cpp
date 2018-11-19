#include "webassembly/export.h"

#include <string>
#include <iostream>
#include <emscripten/bind.h>

#include "webassembly/cppfuncs.h"

std::string getTestStrCpp()
{
    return "C++ string from C++ code printed through main function";
}

extern "C"
{
    WASM_FUNCTION_EXPORT int getNumPlus(int n)
    {
        return 39 + n;
    }
    WASM_FUNCTION_EXPORT const char *getCStringWithoutNameMangling(const char *str)
    {
        return str;
    }
}

std::string stdStringSignature(const std::string &firstStr)
{
    return firstStr + " added to this";
}