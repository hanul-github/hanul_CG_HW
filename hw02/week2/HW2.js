import { resizeAspectRatio, setupText, updateText } from "../../WebGLDist/WebGLSource/util/util.js";
import { Shader, readShaderFile } from "/../WebGLDist/WebGLSource/util/shader.js";
const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl2");

let shader;
let vao;
let horizental = 0;
let vertical = 0;

let textOverlay3;

function initWebGL(){
    if(!gl){
        console.error("WebGL 2 is not supported by your browser.");
    }
    const CANVAS_WIDTH = 600;
    const CANVAS_HEIGHT = 600;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    resizeAspectRatio(gl, canvas);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1.0);

    return true
}


async function initShader(){
    const vertexShaderSource = await readShaderFile('shVert.glsl');
    const fragmentShaderSource = await readShaderFile('shFrag.glsl');
    return new Shader(gl, vertexShaderSource, fragmentShaderSource);
}

function setupKeyboardEvents(){
    document.addEventListener('keydown', (event)=>{
        if (event.key == 'ArrowLeft') {
                updateText(textOverlay3, "move left");
                horizental -= 0.01; 
                if (horizental-0.1 <= -1.0){
                    alert("사각형이 범위를 벗어났습니다.");
                    vertical = 0;
                    horizental = 0;
                }
        }
            else if (event.key == 'ArrowRight') {
                updateText(textOverlay3, "move right");
                horizental += 0.01;
                if (horizental+0.1 >= 1.0){
                    alert("사각형이 범위를 벗어났습니다.");
                    vertical = 0;
                    horizental = 0;
                }
        }
            else if (event.key == 'ArrowUp') {
                updateText(textOverlay3, vertical);
                vertical  += 0.01;
                if (vertical+0.1 >= 1.0){
                    alert("사각형이 범위를 벗어났습니다.");
                    vertical = 0;
                    horizental = 0;
                }
        }
            else if (event.key == 'ArrowDown') {
                updateText(textOverlay3, "move down");
                vertical -= 0.01;
                if (vertical-0.1 <= -1.0){
                    alert("사각형이 범위를 벗어났습니다.");
                    vertical = 0;
                    horizental = 0;
                }
        }
    });    
}

function setupBuffers(shader){
    const vertices = new Float32Array([
        0.0, 0.0, 0.0, // center
        -0.1, 0.1, 0.0, // top left
        0.1, 0.1, 0.0, // top right
        0.1, -0.1, 0.0, // bottom right
        -0.1, -0.1, 0.0, // bottom left
        -0.1, 0.1, 0.0 // top left
    ]);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    shader.setAttribPointer('aPos', 3, gl.FLOAT, false, 0, 0);
    return vao;
}

function render(vao, shader){
    gl.clear(gl.COLOR_BUFFER_BIT);;

    let color = [1.0, 0.0, 0.0, 1.0];
    shader.setVec4("uColor", color);
    shader.setFloat("horizental", horizental);
    shader.setFloat("vertical", vertical);


    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);

    requestAnimationFrame(() => render(vao, shader));
}

async function main(){
    try{
        if(!initWebGL()){
            throw new Error("WebGL 초기화 실패");
        }
        shader = await initShader();
        setupText(canvas, "Use arrow keys to move the rectangle", 1);
        textOverlay3 = setupText(canvas, "no key pressed", 2);
        setupKeyboardEvents();
        vao = setupBuffers(shader);
        shader.use();
        render(vao, shader);
        return true;
    } catch(error){
        console.error("Failed to initialize program", error);
        alert('프로그램 초기화 실패.');
        return false;
    }
}

main().then(success => {
    if (!success) {
        console.log('프로그램을 종료합니다.');
        return;
    }
}).catch(error => {
    console.error('프로그램 실행 중 오류 발생:', error);
});