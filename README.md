# [three musketeers](https://webgl.github.io/three-musketeers)
[![Build Status](https://travis-ci.org/webgl/three-musketeers.svg?branch=master)](https://travis-ci.org/webgl/three-musketeers)
[![npm](https://img.shields.io/npm/v/three-musketeers.svg)](https://www.npmjs.com/package/three-musketeers)

<img width=200 src="https://raw.githubusercontent.com/webgl/three-musketeers/master/public/logo.png" />

> "All for one. One for all."

This module serves as an intuitive tool to introspect, debug and test any THREE.js application.

[GitHub](https://github.com/webgl/three-musketeers) &mdash;
[Documentation](https://webgl.github.io/three-musketeers) &mdash;
[Examples](https://github.com/webgl/three-musketeers/tree/master/src/__example__) &mdash;
[Demo](https://www.youtube.com/watch?v=CgBypTWd5i8)

## Demo

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/CgBypTWd5i8/0.jpg)](https://www.youtube.com/watch?v=CgBypTWd5i8)

## Usage

Download the [minified library](https://github.com/webgl/three-musketeers/blob/master/build/three-musketeers.min.js) and include it in your HTML, or install and import it as a [npm module](https://www.npmjs.com/package/three-musketeers).

```bash
$ npm i three-musketeers
```

The code below creates a scene, a camera, and a geometric cube, and it adds the cube to the scene. It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.

Lastly, we simply pass the necessary resources to the musketeers instance and attach it to our `window` via the alias `$$$` for experimentation:

```javascript
// sample application
import * as THREE from 'three';
import musketeers from 'three-musketeers';

init();

function init() {
  const { innerWidth, innerHeight } = window;
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.01, 10);
  camera.position.z = 1;
  scene.add(camera);

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial({ color: 0xFF0000 })
  );
  // assign a unique name to our mesh to be able to query it later
  mesh.name = 'CUBE_1';
  scene.add(mesh);

  renderer.render(scene, camera);

  // attach $$$ to the window for browser debugging
  window.$$$ = musketeers({ renderer, scene, camera });
}
```

Now, you can inspect the scene through the `window` object:

```javascript
// javascript console in the browser

$$$
.debug() // enable visual debug mode
.isValid(); // true
```

```javascript
$$$
.find('Cube_1') // the unique identifier we assigned to our mesh
.exists(); // true
```

```javascript
$$$
.findAll((node) => node.geometry.type === 'BoxGeometry') // returns an array of items of this type
```

```javascript
$$$
.find('Cube_1')
.click(); // locates the item in the 3D scene and clicks the item
```

```javascript
window.addEventListener('click', (event) => {
  // find all intersected items on 'click'
  const intersectedItems = $$$.pickFromEvent(event);
  console.log(intersectedItems); // useful for debugging
});
```
Check out the [documentation](https://webgl.github.io/three-musketeers) for more details. You can also check out the [example](https://github.com/webgl/three-musketeers/tree/master/src/__example__) testing a 3D application with selenium.

```bash
# running and testing the example 3d application

$ npm run selenium
$ npm run start
$ npm run test:e2e
```

## Contribute
I welcome contributors. Please contribute if you have ideas to improve this library. Please use GitHub's pull request and issues features. You can also help implement upcoming features from the [TODO](https://github.com/webgl/three-musketeers/blob/master/TODOS.md) page. Feel free to reach out if you'd like more context or info for implementation details.

Here are a few scripts to help you get started:

| NPM Commands | Description                                               |
| ------------ | --------------------------------------------------------- |
| `start`      | Runs the examples for development                         |
| `test`       | Runs unit tests for the module                            |
| `build`      | Builds the module                                         |
| `docs`       | Updates the documentation                                 |
| `components` | Updates the component entry points                        |
| `selenium`   | Runs selenium                                             |
| `test:e2e`   | Runs e2e automated testing for the examples as an example |

## Other Resources

[Three.js Questions](http://stackoverflow.com/questions/tagged/three.js) &mdash;
[Three.js Forum](https://discourse.threejs.org/) &mdash;
[Three.js Gitter](https://gitter.im/mrdoob/three.js) &mdash;
[Three.js Slack](https://threejs-slack.herokuapp.com/)