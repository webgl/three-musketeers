// local dependencies
import { findAll } from '../../rootComponents/rootComponents';

export default (node) =>
  /**
   * Find all nodes with the given validator. By default, the first argument accepts a string
   * that is used to find the first node with the matching `name` value. For more advanced
   * queries, you can provide a function to validate any property to find the desired node.
   *
   * @module findAll
   * @param {string|function} name - Either a `string` or `function` that is used to find the
   * matching node.
   * @returns {node[]} - An array of matching nodes.
   *
   * @example
   * // returns an array of child nodes under `Cube_1` with the `name` being `Cube_1`
   * $$$
   * .find('Cube_1')
   * .findAll('Cube_1');
   *
   * // returns an array of child nodes under `Cube_1` with the `name` containing the word `Cube`
   * $$$
   * .find('Cube_1')
   * .findAll(node => ~node.name.indexOf('Cube'));
   */
    (name) => findAll(name, node);