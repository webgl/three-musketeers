// dependencies
import _ from 'lodash';

export default (node) =>
  /**
   * Given a node, check whether it has any child nodes in the `scene`.
   *
   * @module hasChildren
   * @returns {boolean} - Returns whether the node has any children.
   *
   * @example
   * $$$
   * .find('Cubes') // find an element with the name `Cubes`
   * .hasChildren(); // returns `true` as this node contains many cubes
   */
    () => {
    const children = _.get(node, 'children', []);
    return !!children.length;
  };