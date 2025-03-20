// Global constants
const canvas = document.getElementById('glCanvas'); // Get the canvas element 
const gl = canvas.getContext('webgl2'); // Get the WebGL2 context

if (!gl) {
    console.error('WebGL 2 is not supported by your browser.');
}

// Set canvas size: 현재 window 전체를 canvas로 사용
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// // Initialize WebGL settings: viewport and clear color
// gl.viewport(0, 0, canvas.width, canvas.height);
// gl.clearColor(1.0, 0, 0, 1.0);

// Start rendering
render();

// // Render loop
// function render() {
//     gl.clear(gl.COLOR_BUFFER_BIT);    
//     // Draw something here
// }

gl.enable(gl.SCISSOR_TEST);

function render() {
    // 왼쪽 위를 빨간색으로 칠하기
    gl.viewport(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    gl.scissor(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    gl.clearColor(1, 0, 0, 1.0);  // Red
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 오른쪽 위를 초록색으로 칠하기
    gl.viewport(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    gl.scissor(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    gl.clearColor(0, 1, 0, 1.0);  // Green
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 왼쪽 아래를 파란색으로 칠하기
    gl.viewport(0, 0, canvas.width / 2, canvas.height / 2);
    gl.scissor(0, 0, canvas.width / 2, canvas.height / 2);
    gl.clearColor(0, 0, 1, 1.0);  // Blue
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 오른쪽 아래를 노란색으로 칠하기
    gl.viewport(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);
    gl.scissor(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);
    gl.clearColor(1, 1, 0, 1.0);  // Yellow
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.viewport(0, 0, canvas.height, canvas.width)
}

// Resize viewport when window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    render();
});

