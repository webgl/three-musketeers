// local dependencies
import { find } from '../../rootComponents/rootComponents';

export default (node) =>
  /**
   * Find the first node with the given validator. By default, the first argument accepts a string
   * that is used to find the first node with the matching `name` value. For more advanced
   * queries, you can provide a function to validate any property to find the desired node.
   *
   * @module find
   * @param {string|function} name - Either a `string` or `function` that is used to find the
   * matching node.
   * @returns {node} - Chainable api by returning `node`.
   *
   * @example
   * // returns the first child node under `Cube_1` with the `name` being `Child_Cube_1`
   * $$$
   * .find('Cube_1')
   * .find('Child_Cube_1');
   *
   * // returns the first child node under `Cube_1` with the `name` being `Child_Cube_2`
   * $$$
   * .find(node => node.name === 'Cube_1')
   * .find('Child_Cube_2');
   */
    (name) => find(name, node);
