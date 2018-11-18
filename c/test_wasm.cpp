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

int main()
{
    std::cout << "Running main()" << std::endl;
    std::cout << getTestStrCpp() << std::endl;
    return 0;
}