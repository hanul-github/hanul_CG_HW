#version 300 es

layout (location = 0) in vec3 aPos;

uniform float horizental;
uniform float vertical;


void main() {
    gl_Position = vec4(aPos[0]+horizental, aPos[1]+vertical, aPos[2], 1.0);
}