// dependencies
import _ from 'lodash';

// local dependencies
import store from '../../store/store';
import { getCallbackID } from '../../util/helpers';

export default (node) =>
  /**
   * Removes the callbacks associated with the given node. If no callback is provided,
   * all callback associated with the event are removed.
   *
   * @module off
   * @param {object} event - The event to perform operation.
   * @param {function} [callback] - The specific callback to remove from the `event`.
   * @returns {self} - Chainable api by returning the node.
   *
   * @example
   * function clickCallback() {
   *   console.log('CLICKED');
   * }
   *
   * $$$
   * .find('Cube_1')
   * .on('click', clickCallback)
   * .trigger('click') // logs 'CLICKED'
   * .off('click', clickCallback)
   * .trigger('click'); // no log
   *
   * $$$
   * .find('Cube_1')
   * .on('click', clickCallback)
   * .trigger('click') // logs 'CLICKED'
   * .off('click') // all callbacks associated with `click` are removed
   */
    (event, callback) => {
    const callbackID = getCallbackID(node, event);
    const callbacks = store.get(callbackID);
    callbacks && _.isFunction(callback)
      ? _.remove(callbacks, (_callback) => _.isEqual(_callback, callback))
      : store.set(callbackID, []);
    return node;
  };