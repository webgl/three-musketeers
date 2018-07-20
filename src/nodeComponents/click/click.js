// dependencies
import _ from 'lodash';
import * as THREE from 'three';

// local dependencies
import store from '../../store/store';
import C from '../../constants/constants';
import { simulate } from '../../rootComponents/rootComponents';
import { getCallbackID, worldToScreenSpace, getNodePosition } from '../../util/helpers';

export default (node) =>
  /**
   * Click the position (center) of a given existing node. You can pass `debug` to see cursor.
   *
   * @module click
   * @param {boolean} [debug=false] - Allows to turn on the visuals for the `click` action.
   * @returns {self} - Chainable api by returning the node.
   *
   * @example
   * $$$
   * .find('Cube_1') // an element in the scene with a name of `Cube_1`
   * .click(); // clicks the node
   *
   *  $$$
   * .find('Cube_1')
   * .click(true); // you can also pass in `debug` as `true` to see the cursor
   */
    (debug = false) => {
    const position = getNodePosition(node);
    const canvas = store.get(C.RENDERER).domElement;
    const screenSpace = worldToScreenSpace(position.x, position.y, position.z, canvas);

    const eventData = {
      clientX: screenSpace.x,
      clientY: screenSpace.y
    };

    simulate(C.MOUSE_MOVE, eventData, debug);
    simulate(C.CLICK, eventData, debug);

    // trigger all associated events
    const callbackID = getCallbackID(node, C.CLICK);
    const callbacks = store.get(callbackID);

    if (callbacks) {
      _.each(callbacks, (cb) => cb(node));
    }

    return node;
  };
