import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// 씬 생성
const scene = new THREE.Scene();

// 카메라 설정
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 렌더러 설정
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 회전하는 큐브 생성
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();