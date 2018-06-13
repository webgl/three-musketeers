// dependencies
import _ from 'lodash';

// local dependencies
import store from '../../store/store';
import { print, resources } from '../../util/helpers';

/**
 * Returns whether the instance contains all required resources to be functional.
 *
 * @module isValid
 * @returns {boolean} - Whether the instance is valid.
 *
 * @example
 * import musketeers from 'three-musketeers';
 *
 * const $$$ = musketeers();
 * $$$.isValid(); // returns false
 *
 * $$$.setResource({
 *   camera,
 *   renderer,
 *   scene
 * });
 * $$$.isValid(); // returns true
 */
export default function() {
  // todo: do better resource checking
  return _.reduce(resources, (result, name) => {
    if (_.isNil(store.get(name))) {
      print(`Resource '${name}' is missing`, 'error');
      return false;
    }
    return result;
  }, true);
};
