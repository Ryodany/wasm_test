@echo off

call emcc test_wasm.cpp -O3 -s WASM=1 -o test.wasm

echo.
echo Compilation done!

echo Press ENTER to exit...
pause >nul