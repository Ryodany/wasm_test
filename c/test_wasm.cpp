#include <string>
#include <iostream>
#include "include/webassembly/export.h"

WASM_FUNCTION_EXPORT void getTestStrCpp()
{
    std::cout << "Printing in C++" << std::endl;
    //return "C++!! YEAAAAAAAAAAAAAAAH IT WORKS :D";
}