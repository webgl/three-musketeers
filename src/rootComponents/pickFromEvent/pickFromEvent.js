// local dependencies
import store from '../../store/store';
import C from '../../constants/constants';
import { screenToClipSpace, updateMousePosition } from '../../util/helpers';

/**
 * Given an event, return all intersected items from the given `clientX` and `clientY`
 * coordinates. By default, it returns all intersected points, but you can turn off `recursive`
 * mode to return only the first intersected item.
 *
 * @module pickFromEvent
 * @param {object} event - A mouse event that is used for picking.
 * @param {object} event.clientX - The screen space x-coordinate.
 * @param {object} event.clientY - The screen space y-coordinate.
 * @param {boolean} [debug=false] - Allows to turn on the cusrsor visuals.
 * @param {boolean} [recursive=true] - Whether to intersect all intersected items.
 * @returns {object[]} - An array of intersected items.
 *
 * @example
 * const event = { clientX: 500, clientY: 500 }; // sample event
 *
 * $$$.pickFromEvent(event); // returns an array of intersected points
 *
 * // a useful debugging tool of using events and picking to grab intersected items
 * window.addEventListener('mousemove', (event) => {
 *   console.log($$$.pickFromEvent(event)); // logs all intersected items on `mousemove`
 * });
 */
export default function(event, debug = false, recursive = true) {
  const
    raycaster = store.get(C.RAYCASTER),
    scene = store.get(C.SCENE),
    camera = store.get(C.CAMERA),
    canvas = store.get(C.RENDERER).domElement;

  updateMousePosition(event, debug);
  const coords = screenToClipSpace(
    event.clientX,
    event.clientY,
    canvas.clientWidth,
    canvas.clientHeight
  );
  raycaster.setFromCamera(coords, camera);
  return raycaster.intersectObject(scene, recursive);
};