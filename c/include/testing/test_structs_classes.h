#pragma once

#include <string>
#include <memory>
#include "webassembly/emscripten.h"

struct Coordinate
{
    float x;
    float y;
};

struct StructExample
{
    uint16_t m_number;
    std::string m_name;
};

StructExample constructStructExample(uint16_t number, const std::string &name);

std::string coordinateAsString(const Coordinate &coordinate);

std::string &returnStructExampleString(StructExample &structExample);

class Vector3f
{
public:
    Vector3f(float x, float y, float z);

    float getMagnitude();

    // getters and setters necessary for property, see EMSCRIPTEN_BINDINGS below
    float getX() const { return m_x; }
    void setX(float x) { m_x = x; }

    float getY() const { return m_y; }
    void setY(float y) { m_y = y; }

    float getZ() const { return m_z; }
    void setZ(float z) { m_z = z; }

private:
    float m_x;
    float m_y;
    float m_z;
};

std::unique_ptr<Vector3f> getNewVector3f(float x, float y, float z);

EMSCRIPTEN_BINDINGS(test_structs)
{
    emscripten::value_array<Coordinate>("Coordinate")
        .element(&Coordinate::x)
        .element(&Coordinate::y);

    emscripten::function("coordinateAsString", &coordinateAsString);

    emscripten::value_object<StructExample>("StructExample")
        .field("number", &StructExample::m_number)
        .field("name", &StructExample::m_name);

    emscripten::class_<Vector3f>("Vector3f")
        .constructor<float, float, float>()
        .property("x", &Vector3f::getX, &Vector3f::setX)
        .property("y", &Vector3f::getY, &Vector3f::setX)
        .property("z", &Vector3f::getZ, &Vector3f::setZ)
        .function("getMagnitude", &Vector3f::getMagnitude);

    emscripten::function("constructStructExample", &constructStructExample);

    emscripten::function("getNewVector3f", &getNewVector3f);

    emscripten::function("returnStructExampleString", &returnStructExampleString);
}