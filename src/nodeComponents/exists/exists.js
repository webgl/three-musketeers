// dependencies
import _ from 'lodash';

export default (node) =>
  /**
   * Given a node, check whether it exists in the scene via `uuid`.
   *
   * @module exists
   * @returns {boolean} - Returns whether the node exists in the `scene`
   *
   * @example
   * $$$
   * .find('INVALID') // find an element with the name `INVALID`
   * .exists(); // returns `false` as this node doesn't exist
   *
   *  $$$
   * .find('Cube_1')
   * .exists(); // returns `true` as this node exists in the scene.
   */
    () => {
    const uuid = _.get(node, 'uuid');
    return !_.isNil(uuid);
  };