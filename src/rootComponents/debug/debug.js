// local dependencies
import store from '../../store/store';
import C from '../../constants/constants';

/**
 * Enabled `debug` mode globally, which displays cursor for all actions.
 *
 * @module debug
 * @param {boolean} [debug=true] The debug state, which is `true` by default.
 * @returns {self} Chainable api by returning the instance.
 *
 * @example
 * $$$.debug(); // turns on global debug mode
 * $$$.debug(false); // turns off global debug mode
 */
export default function(debug = true) {
  store
  .set(C.DEBUG, debug)
  .get(C.MOUSE)
  .css({ 'display': debug ? 'block' : 'none' });
  return this;
};