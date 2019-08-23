// dependencies
import * as THREE from 'three';
import assign from 'lodash/assign';
import mapValues from 'lodash/mapValues';
import join from 'lodash/join';
import isFunction from 'lodash/isFunction';
import every from 'lodash/every';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import each from 'lodash/each';

// local dependencies
import store from '../store/store';
import C from '../constants/constants';
import * as nodeComponents from '../nodeComponents/nodeComponents';

export function attachNodeComponents(node) {
  return assign(node, mapValues(nodeComponents, (cb) => cb(node)));
}

export function getID(node = {}, ...others) {
  const id = node.name || node.uuid;
  return id && join([id, ...others], ':');
}

export function getCallbackID(node, e) {
  return join([
    C.CALLBACK_STORE,
    getID(node, e)
  ], '.');
}

export function print(message, type = 'log') {
  console[type](`[${C.NAME}] ${message}`);
  return this;
}

export function findBy(name, recursive, root = store.get(C.SCENE)) {
  const nodes = [];

  function traverse(node) {
    if (!node) return;

    let matches = false;

    if (isFunction(name)) {
      matches = name(node);
    }
    else if (every([
      isString(name),
      !isEmpty(name)
    ])) {
      matches = node.name === name;
    }

    if (matches) {
      nodes.push(node);
    }

    if (recursive || !nodes.length) {
      each(node.children, (child) => {
        traverse(child);
      });
    }
  }

  traverse(root);
  return nodes;
}

export function updateMousePosition(e, debug) {
  const debugEnabled = store.get(C.DEBUG) || debug;
  const mouse = store.get(C.MOUSE);
  if (debugEnabled) {
    mouse.css({
      left: e.clientX,
      top: e.clientY,
      display: 'block',
    });
  }
  else {
    mouse.css('display', 'none');
  }
}

export const resources = [
  C.CAMERA,
  C.RENDERER,
  C.SCENE
];

// world -> clip -> screen
export function worldToScreenSpace(x, y, z, canvas) {
  const clipSpace = worldToClipSpace(x, y, z);
  return clipToScreenSpace(clipSpace.x, clipSpace.y, canvas);
}

// world -> clip - screen
export function worldToClipSpace(x, y, z) {
  const worldPosition = new THREE.Vector3(x, y, z);
  const clipSpaceCoords = worldPosition.project(store.get(C.CAMERA));
  return {
    x: clipSpaceCoords.x,
    y: clipSpaceCoords.y
  };
}

// world - clip -> screen
export function clipToScreenSpace(x, y, canvas) {
  const halfWidth = canvas.clientWidth * 0.5;
  const halfHeight = canvas.clientHeight * 0.5;

  // If canvas doesn't fit the screen then we should take into account its offset
  const offset = getCanvasOffset(canvas);

  return {
    x: x * halfWidth + halfWidth + offset.left,
    y: -(y * halfHeight) + halfHeight + offset.top
  };
}

// world - clip <- screen
export function screenToClipSpace(x, y, canvas) {
  // If canvas doesn't fit the screen then we should take into account its offset
  const offset = getCanvasOffset(canvas);

  return {
    x: (x / canvas.clientWidth) * 2 - 1 - offset.left,
    y: -(y / canvas.clientHeight) * 2 + 1 - offset.top
  };
}

function getCanvasOffset(canvas) {
  const canvasInfo = canvas.getBoundingClientRect();

  return {
    left: canvasInfo.left + window.scrollX,
    top: canvasInfo.top + window.scrollY
  };
}

export function getNodePosition(node) {
  const position = node.getWorldPosition();
  const { x, y, z } = position;

  // Sometimes `getWorldPosition` retrieves (x, y, z) = (0, 0, 0) coordinates
  if (x === 0 && y === 0 && z === 0) {
    // Find the centre point of the 3D node
    return new THREE.Box3()
      .setFromObject(node)
      .getCenter(new THREE.Vector3())
      .applyMatrix4(node.matrixWorld);
  }

  return position;
}
