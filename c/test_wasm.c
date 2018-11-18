#include "include/webassembly/export.h"

#define TEST_SIZE 256

WASM_FUNCTION_EXPORT char *getTestStr()
{
    return "YEAAAAAAAAAAAAAAAH IT WORKS :D";
}