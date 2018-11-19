#include "webassembly/export.h"

#include <string>
#include "webassembly/cppfuncs.h"

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