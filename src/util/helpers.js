// dependencies
import _ from 'lodash';
import * as THREE from 'three';

// local dependencies
import store from '../store/store';
import C from '../constants/constants';
import * as nodeComponents from '../nodeComponents/nodeComponents';

export function attachNodeComponents(node) {
  return _.assign(node, _.mapValues(nodeComponents, (cb) => cb(node)));
}

export function getID(node = {}, ...others) {
  const id = node.name || node.uuid;
  return id && _.join([id, ...others], ':');
}

export function getCallbackID(node, e) {
  return _.join([
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

    if (_.isFunction(name)) {
      matches = name(node);
    }
    else if (_.every([
      _.isString(name),
      !_.isEmpty(name)
    ])) {
      matches = node.name === name;
    }

    if (matches) {
      nodes.push(node);
    }

    if (recursive || !nodes.length) {
      _.each(node.children, (child) => {
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
export function worldToScreenSpace(x, y, z, width, height) {
  const clipSpace = worldToClipSpace(x, y, z, width, height);
  return clipToScreenSpace(clipSpace.x, clipSpace.y, width, height);
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
export function clipToScreenSpace(x, y, width, height) {
  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;
  return {
    x: x * halfWidth + halfWidth,
    y: -(y * halfHeight) + halfHeight
  };
}

// world - clip <- screen
export function screenToClipSpace(x, y, width, height) {
  return {
    x: (x / width) * 2 - 1,
    y: -(y / height) * 2 + 1
  };
}