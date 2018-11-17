@echo off

call wa compile test_wasm.c -O3 -o test.wasm

echo.
echo Compilation done!

echo Press ENTER to exit...
pause >nul