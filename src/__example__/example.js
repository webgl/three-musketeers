// dependencies
import _ from 'lodash';
import * as THREE from 'three';
import musketeers from '..';
import { screenToClipSpace } from '../util/helpers';
import './main.css';

window.THREE = THREE;
require('three/examples/js/controls/OrbitControls');

let
  width = window.innerWidth,
  height = window.innerHeight,
  dpi = window.devicePixelRatio,
  boxSize = 15,
  boxCount = 25,
  boxPadding = 1.5,
  boxes = null,
  camera = null,
  scene = null,
  renderer = null,
  controls = null,
  mouse = null,
  raycaster = null;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xDDDDDD);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(dpi);
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, 500);
  camera.lookAt(new THREE.Vector3());

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  boxes = new THREE.Object3D();
  const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  _.times(boxCount, (i) => {
    const box = new THREE.Mesh(boxGeometry, new THREE.MeshNormalMaterial());
    box.name = `BOX_${i}`;
    box.position.setX((boxSize * i * boxPadding));
    box.rotateX(0.1 * i);
    boxes.add(box);
  });
  boxes.translateX(-boxSize * boxCount * boxPadding / 2 + ((boxSize + boxPadding) / 2));
  scene.add(boxes);

  window.addEventListener('resize', onWindowResize);
  renderer.domElement.addEventListener('click', onDocumentMouseDown);

  window.$$$ = musketeers({ renderer, scene, camera });
}

function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function onDocumentMouseDown(e) {
  e.preventDefault();
  const coords = screenToClipSpace(e.clientX, e.clientY, renderer.domElement);
  mouse.set(coords.x, coords.y);
  raycaster.setFromCamera(mouse, camera);

  const intersect = raycaster.intersectObjects(boxes.children)[0];
  if (intersect) {
    const scaleUpdate = intersect.object.isSelected ? 1 : boxPadding;
    intersect.object.scale.set(scaleUpdate, scaleUpdate, scaleUpdate);
    intersect.object.isSelected = !intersect.object.isSelected;
  }
}

function render(t) {
  requestAnimationFrame(render);
  controls.update();
  boxes.rotation.x += 0.01;
  scene.background.setRGB(
    Math.sin(t / 1000) * 0.1 + 0.9,
    Math.cos(t / 2000) * 0.1 + 0.9,
    Math.sin(t / 3000) * 0.1 + 0.9
  );
  renderer.render(scene, camera);
}

init();
render();