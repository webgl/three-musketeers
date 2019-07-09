// dependencies
import _ from 'lodash';

// local dependencies
import store from '../../store/store';
import { attachNodeComponents, print, resources } from '../../util/helpers';

/**
 * Returns the matching resource given the resource name. The returned resource is a node with
 * attached node methods.
 *
 * NOTE: You can also leverage the `constants` from the instance for valid string values.
 *
 * @module getResource
 * @param {string} resourceName - The resource name.
 * @returns {node|false} - An array of matching nodes.
 *
 * @example
 * // returns the `camera` resource
 * $$$.getResource('camera');
 *
 * // constants are useful to ensure the strings match
 * const C = $$$.constants;
 * // returns the `renderer` resource
 * $$$.getResource(C.RENDERER);
 *
 * // returns false for invalid resources
 * $$$.getResource('INVALID');
 */
export default function(resourceName) {
  const resource = store.get(resourceName);
  if (_.includes(resources, resourceName)) {
    return attachNodeComponents(resource);
  }
  print(`'${resourceName}' does not exist`, 'warn');
  return false;
};