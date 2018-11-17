#include "include/webassembly/export.h"

WASM_FUNCTION_EXPORT char *getTestStr()
{
    return "test\0";
}