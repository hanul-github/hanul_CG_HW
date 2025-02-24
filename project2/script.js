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

// 움직이는 구체 생성
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 애니메이션 루프
let direction = 1;
function animate() {
    requestAnimationFrame(animate);
    sphere.position.x += 0.02 * direction;
    if (sphere.position.x > 2 || sphere.position.x < -2) direction *= -1;
    renderer.render(scene, camera);
}
animate();