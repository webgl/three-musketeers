// dependencies
import _ from 'lodash';

// local dependencies
import store from '../../store/store';
import { getCallbackID } from '../../util/helpers';

export default (node) =>
  /**
   * Given a node, trigger the associated `event`.
   *
   * @module trigger
   * @param {object} event - The event for the callback.
   * @returns {self} - Chainable api by returning the node.
   *
   * @example
   * function clickCallback() {
   *   console.log('RANDOM EVENT');
   * }
   *
   * $$$
   * .find('Cube_1')
   * .on('sampleEvent', clickCallback)
   * .trigger('sampleEvent') // logs 'RANDOM EVENT'
   */
    (event) => {
    const callbackID = getCallbackID(node, event);
    const callbacks = store.get(callbackID);
    if (callbacks) {
      _.each(callbacks, (cb) => cb(node));
    }
    return node;
  };