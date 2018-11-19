#include <string>
#include <iostream>
#include "webassembly/export.h"

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

/*
    To be able to use exported C++ functions they need to have primitive signature (const char *, int, short, long etc., basically C types).
    First declare prototype function appending asm("<function_name>") to avoid C++ name mangling. Then internally inside the function you
    can use any C++ std type, like std::string and so on.
*/
WASM_FUNCTION_EXPORT const char *usingStdStringInternally(const char *firstStr) asm("usingStdStringInternally");

const char *usingStdStringInternally(const char *firstStr)
{
    return std::string(std::string(firstStr) + " added to this").c_str();
}

int main()
{
    std::cout << "Running main() when emscripten .js file is required" << std::endl;
    std::cout << getTestStrCpp() << std::endl;
    return 0;
}