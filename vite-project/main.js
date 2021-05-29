import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, .1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 15, 100);
const material = new THREE.MeshStandardMaterial({color: 0x92F919});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(10,10,5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 60);
//scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const Stargeometry = new THREE.SphereGeometry(.25, 24, 24);
  const Starmaterial = new THREE.MeshStandardMaterial({color: 0xFFFF00});
  const stars = new THREE.Mesh(Stargeometry, Starmaterial);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  stars.position.set(x, y, z);
  scene.add(stars);
}

Array(500).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;

const portraitTexture = new THREE.TextureLoader().load('portrait.jpg');

const me = new THREE.Mesh(
  new THREE.BoxGeometry(10,15,10),
  new THREE.MeshBasicMaterial({map: portraitTexture})
);

scene.add(me);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({map: moonTexture})
);

scene.add(moon);

moon.position.z = 20;
moon.position.setX(-10);

me.position.z = -30;
me.position.setX(20);



function moveCamera()
{
  const t = document.body.getBoundingClientRect().top;
  moon.rotateY(.1);
  me.rotateZ(.1);
  torus.rotateX(.1);

  camera.position.z = t * -0.05;
  camera.position.x = t * -.02;
  camera.position.y = t * -.002;

}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);

  torus.rotateX(.01);
  torus.rotateY(.01);
  torus.rotateZ(.01);
  
  moon.rotateX(.001);
  moon.rotateY(.001);
  moon.rotateZ(.001);

  me.rotateZ(.01);


  //controls.update();

  renderer.render(scene, camera);
}

animate();