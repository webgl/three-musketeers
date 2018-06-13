// dependencies
import _ from 'lodash';

// local dependencies
import store from '../../store/store';
import C from '../../constants/constants';
import { findBy, attachNodeComponents } from '../../util/helpers';

/**
 * Find all nodes with the given validator. By default, the first argument accepts a string
 * that is used to find the first node with the matching `name` value. For more advanced
 * queries, you can provide a function to validate any property to find the desired node.
 *
 * The second argument is an optional argument where you can specify the parent node to search
 * for children nodes. By default, it will search from the top of the THREE.js scene.
 *
 * @module findAll
 * @param {string|function} name - Either a `string` or `function` that is used to find the
 * matching node.
 * @param {object} [root=scene] - The parent node to traverse the scene. By `default,` it's the
 * `scene`.
 * @returns {node[]} - An array of matching nodes.
 *
 * @example
 * // returns an array of nodes with the `name` being `Cube_1`
 * $$$.findAll('Cube_1');
 *
 * // returns an array of nodes with the `name` containing the word `Cube`
 * $$$.findAll(node => ~node.name.indexOf('Cube'));
 *
 * // returns an array of nodes with geometry type being 'PlaneBufferGeometry'
 * $$$.findAll(node => node.geometry.type === 'PlaneBufferGeometry');
 */
export default function(name, root = store.get([C.SCENE])) {
  const nodes = findBy(name, true, root);
  return _.map(nodes, attachNodeComponents);
}