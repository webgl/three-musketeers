// local dependencies
import _ from 'lodash';

// local dependencies
import store from './store/store';
import C from './constants/constants';
import { updateMousePosition, print } from './util/helpers';
import * as rootComponents from './rootComponents/rootComponents';

/**
 * The root instance where you instantiate a `three-musketeers` application by invoking the
 * function.
 *
 * @module instance
 * @param {object} [config] - The THREE.js application resources for introspection.
 * @param {camera} [config.camera] - THREE.js camera instance. If not provided, the one attached
 * to the `scene` will automatically be used.
 * @param {renderer} config.renderer - THREE.js renderer instance.
 * @param {scene} config.scene - THREE.js scene instance.
 *
 * @example
 * // there are several ways to instantiate the musketeers tool
 *
 * import musketeers from 'three-musketeers';
 *
 * // you can pass in all necessary resources at initialization
 * const $$$ = musketeers({
 *   renderer, // THREE renderer instance
 *   scene, // THREE scene instance
 *   camera // THREE camera instance
 * });
 *
 * // you can also just instantiate and set later throughout the application
 * const $$$ = musketeers();
 * $$$.setResource('camera', camera); // THREE camera instance
 * // see `setResource` for further documentation
 *
 * // If no camera is specified, the default camera attached the `scene` will be set
 * const $$$ = musketeers({
 *   renderer, // THREE renderer instance
 *   scene, // THREE scene instance
 * });
 * $$$.getResource('camera'); // returns the camera that's attached to the `scene`
 */
export default function(config) {
  print(C.VERSION);
  store.reset();

  const root = _.assign(rootComponents, {
    name: C.NAME,
    constants: C,
    store
  });

  if (config) {
    root.setResource(config);
  }

  document.addEventListener(C.MOUSE_MOVE, updateMousePosition);

  return root;
};

