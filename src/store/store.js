// dependencies
import _ from 'lodash';
import * as THREE from 'three';

// local dependencies
import mouse from './mouse';
import C from '../constants/constants';

const defaultState = {
  // state
  [C.DEBUG]: false,
  // elements
  [C.MOUSE]: mouse,
  // collections
  [C.CALLBACK_STORE]: {},
  // resources
  [C.CAMERA]: null,
  [C.RAYCASTER]: new THREE.Raycaster(),
  [C.RENDERER]: null,
  [C.SCENE]: null
};

let store = _.cloneDeep(defaultState);

export default {
  snapshot: () => _.clone(store),
  get: (key) => _.get(store, key),
  set: function(key, value) {
    _.set(store, key, value);
    return this;
  },
  reset: function() {
    store = _.cloneDeep(defaultState);
    return this;
  }
};