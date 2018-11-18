#include "webassembly/export.h"

WASM_FUNCTION_EXPORT const char *getTestStrC()
{
    return "C string from C function";
}