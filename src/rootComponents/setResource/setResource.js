// dependencies
import _ from 'lodash';

// local dependencies
import store from '../../store/store';
import C from '../../constants/constants';
import { print, resources } from '../../util/helpers';
import { getResource, find } from '../rootComponents';

/**
 * Sets the resource. You can either set resources one-by-one which can be useful to add them
 * throughout your application at various times or as a collection.
 *
 * NOTE: You can also leverage the `constants` from the instance for valid string values.
 *
 * @module setResource
 * @param {string|object} key - The resource name or an `object` containing the resource key and
 * values.
 * @param {camera} [key.camera] - THREE.js camera instance. If not provided, the one attached
 * to the `scene` will automatically be used.
 * @param {renderer} key.renderer - THREE.js renderer instance.
 * @param {scene} key.scene - THREE.js scene instance.
 * @param {object} [value] - The resource value or it's optional if first argument is an `object`.
 * @returns {self} - Chainable api by returning the instance.
 *
 * @example
 * // can leverage constants
 * const C = $$$.constants;
 *
 * $$$.setResource(C.C, camera); // camera being a THREE.js camera instance
 * $$$.setResource('renderer', renderer); // camera being a THREE.js renderer instance
 * $$$.setResource('scene', scene); // camera being a THREE.js scene instance
 *
 * // or you can set all at once
 * $$$.setResource({
 *   camera,
 *   renderer,
 *   scene
 * });
 */
export default function setResource(key, value) {
  if (_.includes(resources, key) && value) {
    store.set(key, value);
    _attachCamera(key);
  }
  else if (_.isPlainObject(key)) {
    _.each(key, (v, k) => setResource(k, v));
  }
  else {
    print(`Resource '${key}' is not valid`, 'error');
  }

  return this;
};

function _attachCamera(key) {
  const _sceneWithoutCamera = (key) => {
    return _.every([
      key === C.SCENE,
      !getResource(C.CAMERA).exists()
    ]);
  };

  if (_sceneWithoutCamera(key)) {
    store.set(C.CAMERA, find((n) => {
      const type = n.type;
      return type && _.includes(
        type.toLowerCase(),
        C.CAMERA.toLowerCase()
      );
    }));
  }

  if (_sceneWithoutCamera(key)) {
    _.delay(() => _attachCamera(key), 500);
  }
}
