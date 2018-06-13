// dependencies
import _ from 'lodash';
import uuid from 'uuid';
import * as THREE from 'three';

// local dependencies
import C from '../constants/constants';

global._console = _.cloneDeep(global.console);

export function initMocks() {
  global.mocks = {
    console: {
      error: jest.fn(),
      info: jest.fn(),
      log: jest.fn(),
      warn: jest.fn()
    }
  };

  _.each(global.mocks.console, (mock, type) => {
    global.console[type] = (...args) => {
      mock(...args);
      // uncomment to omit all outputs to console
      // global._console[type](...args);
    };
  });
}

export function createNode() {
  return { uuid: uuid(), children: [] };
}

export function createThreeResources() {
  const canvas = document.createElement('canvas');
  _.each(['width', 'height'], (key) => canvas[key] = '1000px');
  return {
    [C.SCENE]: new THREE.Scene(),
    [C.CAMERA]: new THREE.PerspectiveCamera(),
    [C.RENDERER]: {
      uuid: uuid(),
      domElement: canvas
    }
  };
}

export function addBoxesToScene(instance, name = '', count = 1) {
  return _.times(count, (i) => addBoxToScene(instance, name || i));
}

export function addBoxToScene(instance, name = '') {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry());
  mesh.name = name;
  instance.getResource(C.SCENE).add(mesh);
  return mesh;
}