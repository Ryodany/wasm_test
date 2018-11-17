@echo off

call wa compile -o test.wasm test_wasm.c

echo Compilation done!

echo Press ENTER to exit...
pause >nul