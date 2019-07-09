// local dependencies
import store from '../../store/store';
import C from '../../constants/constants';
import { updateMousePosition } from '../../util/helpers';

/**
 * Simulate a mouse event on the coordinates provided by an event's `clientX` and
 * `clientY` coordinates. Additionally, `debug` can be enabled to see the cursor position.
 *
 * @module simulate
 * @param {string} type - The type of mouse event to simulate.
 * @param {object} event - A mouse event that is used for trigger an event.
 * @param {object} event.clientX - The screen space x-coordinate.
 * @param {object} event.clientY - The screen space y-coordinate.
 * @param {boolean} [debug=false] - Allows to turn on the visuals for the `event`.
 * @returns {self} - Chainable api by returning the instance.
 *
 * @example
 * const event = { clientX: 500, clientY: 500 }; // sample event
 * $$$.simulate('click', event); // clicks the positions provided in the event
 * $$$.simulate('click', event, true); // enable cursor visual with `debug` set to `true`
 */
export default function(type, event, debug = false) {
  const canvas = store.get(C.RENDERER).domElement;
  canvas.dispatchEvent(new MouseEvent(type, event));
  updateMousePosition(event, debug);
  return this;
};


