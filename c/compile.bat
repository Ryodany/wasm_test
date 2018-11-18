@echo off

set cur_dir=%~dp0
set wasm_build_dir_name=wasm_build\
set wasm_build_dir=%cur_dir%%wasm_build_dir_name%

if exist %wasm_build_dir% ( rmdir /s /q %wasm_build_dir% )
echo Creating temporary folder %wasm_build_dir_name%...
mkdir %wasm_build_dir%
echo.

set modules_to_compile=test_wasm.cpp test_wasm.c
set output_file=cpptest.js
echo Compiling %modules_to_compile%...
rem call wa compile test_wasm.c -O3 -o test.wasm
call em++ %modules_to_compile% -g2 -std=c++14 -O1 -s MODULARIZE=1 -s WASM=1 -s ASSERTIONS=1 -s EXPORTED_FUNCTIONS="['_getTestStrCpp']" -o %wasm_build_dir%%output_file%
rem -std=c++17 doesn't work yet apparently
echo.


set node_wasm_dir_name=..\node\wasm\
set node_wasm_dir=%cur_dir%%node_wasm_dir_name%
if exist %node_wasm_dir% (
    rmdir /s /q %node_wasm_dir%
    )
mkdir %node_wasm_dir%

set load_wasm_workerjs=load-wasm-worker.js
set beforejs=before.js
echo Moving generated wasm stuff from %wasm_build_dir_name% to %node_wasm_dir_name%...
move /Y %wasm_build_dir%* %node_wasm_dir%
move /Y %cur_dir%%load_wasm_workerjs% %node_wasm_dir%
echo WARNING: not moving %beforejs% as it is not currently needed, watch out in the future
del %cur_dir%%beforejs%
rem move /Y %cur_dir%%beforejs% %node_wasm_dir%
echo.

echo Removing temporary folder %wasm_build_dir_name%...
rmdir /s /q %wasm_build_dir%
echo.
echo.

echo Build process done
echo.

echo Press ENTER to exit...
pause >nul