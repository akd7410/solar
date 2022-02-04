import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SphereGeometry } from "three";
const scene = new THREE.Scene();

const Camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  10,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

Camera.position.setZ(10);
Camera.position.setX(-70);

renderer.render(scene, Camera);

const geometry = new THREE.SphereGeometry(10, 100, 100);
const texture = new THREE.TextureLoader().load("sun.jpg");
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  map: texture,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const light = new THREE.PointLight(0xffffff);

light.position.set(20, 20, 20);

// scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff);

scene.add(light, ambient);

// const help = new THREE.PointLightHelper(light);

// const grid = new THREE.GridHelper(200, 50);
// scene.add(grid);
// scene.add(help);

const ctrl = new OrbitControls(Camera, renderer.domElement);

function add_stars() {
  const geo = new THREE.SphereGeometry(0.05, 24, 24);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geo, mat);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

// const bg=new THREE.TextureLoader().load('Space.jpg')

// scene.background= bg;

Array(1000).fill().forEach(add_stars);

const tex = new THREE.TextureLoader().load("download.jpg");
const normal = new THREE.TextureLoader().load("download2.jpg");

const ert = new THREE.SphereGeometry(2, 50, 50);

const mate = new THREE.MeshStandardMaterial({ map: tex, normalMap: normal });

const earth = new THREE.Mesh(ert, mate);

scene.add(earth);

earth.position.setX(-30);
// earth.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.02;

  Camera.position.z = t * -0.01;
  Camera.position.x = t * -0.001;
  Camera.rotation.y = t * -0.00002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.001;

  earth.rotation.x += 0.005;
  earth.rotation.y += 0.005;
  earth.rotation.z += 0.005;
  renderer.render(scene, Camera);
}

animate();
