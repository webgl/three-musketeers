// values starting with _ are intended to be private (e.g. _debug)
export default {
  // name
  NAME: process.env.PACKAGE_NAME,
  // version,
  VERSION: process.env.PACKAGE_VERSION,
  // events
  CLICK: 'click',
  MOUSE_MOVE: 'mousemove',
  // resources
  CAMERA: 'camera',
  RAYCASTER: 'raycaster',
  RENDERER: 'renderer',
  SCENE: 'scene',
  // private
  MOUSE: '_mouse',
  CALLBACK_STORE: '_callbackStore',
  DEBUG: '_debug'
};