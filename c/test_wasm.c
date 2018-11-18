#include <string.h>
#include <stdlib.h>
#include "include/webassembly/export.h"

#define TEST_SIZE 256

WASM_FUNCTION_EXPORT char *getTestStr()
{
    char *ret = (char *)calloc(TEST_SIZE, sizeof(char));
    strcpy(ret, "Comeporongas marico de mierda");
    return ret;
}