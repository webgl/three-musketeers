// local dependencies
import store from '../../store/store';
import { getCallbackID } from '../../util/helpers';

export default (node) =>
  /**
   * Attaches the callback associated with the given node.
   *
   * @module on
   * @param {object} event - The event for the callback.
   * @param {function} [callback] - The specific callback to attach to the `event`.
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
   * .click() // `click` the node and also logs 'CLICKED'
   */
    (event, callback) => {
    const callbackID = getCallbackID(node, event);
    let callbacks = store.get(callbackID);
    if (!callbacks) {
      callbacks = [];
    }
    callbacks.push(callback);
    store.set(callbackID, callbacks);
    return node;
  };