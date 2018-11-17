@echo off

call emcc test_wasm.cpp -s WASM=1 -o test.wasm

echo Compilation done!

pause >nul