// local dependencies
import store from '../../store/store';
import C from '../../constants/constants';
import { findBy, attachNodeComponents } from '../../util/helpers';

/**
 * Find the first node with the given validator. By default, the first argument accepts a string
 * that is used to find the first node with the matching `name` value. For more advanced
 * queries, you can provide a function to validate any property to find the desired node.
 *
 * The second argument is an optional argument where you can specify the parent node to search
 * for children nodes. By default, it will search from the top of the THREE.js scene.
 *
 * @module find
 * @param {string|function} name - Either a `string` or `function` that is used to find the
 * matching node.
 * @param {object} [root=scene] - The parent node to traverse the scene. By `default,` it's the
 * `scene`.
 * @returns {node} - Chainable api by returning `node`.
 *
 * @example
 * // returns the first node with the `name` being `Cube_1`
 * $$$.find('Cube_1');
 *
 * // returns the first node with the `name` being `Cube_1`
 * $$$.find(node => node.name === 'Cube_1');
 *
 * // returns the first node with geometry type being 'PlaneBufferGeometry'
 * $$$.find(node => node.geometry.type === 'PlaneBufferGeometry');
 */
export default function(name, root = store.get(C.SCENE)) {
  const node = findBy(name, false, root)[0];
  return attachNodeComponents(node);
};