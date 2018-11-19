#include <string>
#include <memory>
#include <math.h>

#include "testing/test_structs_classes.h"

StructExample constructStructExample(uint16_t number, const std::string &name)
{
    StructExample ret;
    ret.m_number = number;
    ret.m_name = name;
    return ret;
}

std::string &returnStructExampleString(StructExample &structExample)
{
    return structExample.m_name;
}

std::string coordinateAsString(const Coordinate &coordinate)
{
    return "(" + std::to_string(coordinate.x) + ", " + std::to_string(coordinate.y) + ")";
}

Vector3f::Vector3f(float x, float y, float z) : m_x(x), m_y(y), m_z(z) { };

float Vector3f::getMagnitude()
{
    return sqrtf( exp2f(m_x) + exp2f(m_y) + exp2f(m_z) );
}

std::unique_ptr<Vector3f> getNewVector3f(float x, float y, float z)
{
    return std::make_unique<Vector3f>(x, y, z);
}