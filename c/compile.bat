@echo off

set cur_dir=%~dp0
set c_wasm_build_dir_name=c_wasm_build\
set cpp_wasm_build_dir_name=cpp_wasm_build\
set c_wasm_build_dir=%cur_dir%%c_wasm_build_dir_name%
set cpp_wasm_build_dir=%cur_dir%%cpp_wasm_build_dir_name%

if exist %c_wasm_build_dir% ( rmdir /s /q %c_wasm_build_dir% )
echo Creating temporary folder %c_wasm_build_dir_name%...
mkdir %c_wasm_build_dir%
echo.

if exist %cpp_wasm_build_dir% ( rmdir /s /q %cpp_wasm_build_dir% )
echo Creating temporary folder %cpp_wasm_build_dir_name%...
mkdir %cpp_wasm_build_dir%
echo.

set c_modules_to_compile=test_wasm.c
set cpp_modules_to_compile=test_wasm.cpp test_wasm.c test_structs_classes.cpp

set c_output_file=ctest.wasm
set cpp_output_file=cpptest.js
set include_directories_wa=-I include/
set include_directories_emcc=-I include/ -I "%EMSCRIPTEN%/system/include/"

echo Compiling C: %c_modules_to_compile%...
echo.
call wa compile %include_directories_wa% %c_modules_to_compile% -O3 -o %c_wasm_build_dir%%c_output_file%
IF %ERRORLEVEL% NEQ 0 goto :ERROR_C
echo.

echo Compiling C++: %cpp_modules_to_compile%...
echo.
call em++ %include_directories_emcc% %cpp_modules_to_compile% --bind -std=c++14 -O3 -s WASM=1 -o %cpp_wasm_build_dir%%cpp_output_file%
IF %ERRORLEVEL% NEQ 0 goto :ERROR_CPP
rem -std=c++17 doesn't work yet apparently
echo.

rem Create C wasm folder
set node_c_wasm_dir_name=..\node\wasm\c\
set node_c_wasm_dir=%cur_dir%%node_c_wasm_dir_name%
if exist %node_c_wasm_dir% (
    rmdir /s /q %node_c_wasm_dir%
    )
mkdir %node_c_wasm_dir%

rem Create C++ wasm folder
set node_cpp_wasm_dir_name=..\node\wasm\cpp\
set node_cpp_wasm_dir=%cur_dir%%node_cpp_wasm_dir_name%
if exist %node_cpp_wasm_dir% (
    rmdir /s /q %node_cpp_wasm_dir%
    )
mkdir %node_cpp_wasm_dir%

echo Moving generated C wasm stuff from %c_wasm_build_dir_name% to %node_c_wasm_dir_name%...
move /Y %c_wasm_build_dir%* %node_c_wasm_dir%
echo.

set load_wasm_workerjs=load-wasm-worker.js
set beforejs=before.js
echo Moving generated C++ wasm stuff from %cpp_wasm_build_dir_name% to %node_cpp_wasm_dir_name%...
move /Y %cpp_wasm_build_dir%* %node_cpp_wasm_dir%
move /Y %cur_dir%%load_wasm_workerjs% %node_cpp_wasm_dir%
echo WARNING: not moving %beforejs% as it is not currently needed, watch out in the future
del %cur_dir%%beforejs%
echo.

echo Removing temporary folder %c_wasm_build_dir_name%...
rmdir /s /q %c_wasm_build_dir%

echo Removing temporary folder %cpp_wasm_build_dir_name%...
rmdir /s /q %cpp_wasm_build_dir%
echo.

echo Build process done
echo.

echo Press ENTER to exit...
pause >nul
exit

:ERROR_C
echo Error compiling C sources
pause >nul
exit

:ERROR_CPP
echo Error compiling C++ sources
pause >nul
exit