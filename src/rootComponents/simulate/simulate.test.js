// local dependencies
import C from '../../constants/constants';
import musketeers from '../../index';
import { initMocks, createThreeResources } from '../../util/testUtils';

beforeEach(initMocks);

describe('[root] click', () => {

  test(`is chainable`, () => {
    const $$$ = musketeers(createThreeResources());
    expect($$$.simulate(C.CLICK)).toBe($$$);
  });

  test(`it triggers the 'click' event on the canvas by default`, () => {
    const $$$ = musketeers(createThreeResources());
    const mockedTrigger = jest.fn();
    $$$.store
    .get(C.RENDERER).domElement
    .addEventListener(C.CLICK, mockedTrigger);
    $$$.simulate(C.CLICK);
    expect(mockedTrigger).toHaveBeenCalled();
  });

  test(`it triggers the 'click' event on the canvas`, () => {
    const $$$ = musketeers(createThreeResources());
    const mockedTrigger = jest.fn();
    $$$.store
    .get(C.RENDERER).domElement
    .addEventListener(C.CLICK, mockedTrigger);
    $$$.simulate(C.CLICK);
    expect(mockedTrigger).toHaveBeenCalled();
  });

  test(`it triggers the 'mousemove' event on the canvas`, () => {
    const $$$ = musketeers(createThreeResources());
    const mockedTrigger = jest.fn();
    $$$.store
    .get(C.RENDERER).domElement
    .addEventListener('mousemove', mockedTrigger);
    $$$.simulate(C.MOUSE_MOVE);
    expect(mockedTrigger).toHaveBeenCalled();
  });

  test(`it updates the mouse if debug is enabled`, () => {
    const $$$ = musketeers(createThreeResources());
    const event = { clientX: '100px', clientY: '100px' };
    $$$.simulate(C.CLICK, event, true);
    const mouse = $$$.store.get(C.MOUSE);
    const left = mouse.css('left');
    expect(left).toBe(event.clientX);
    const top = mouse.css('top');
    expect(top).toBe(event.clientY);
    const display = mouse.css('display');
    expect(display).toBe('block');
  });

  test(`it doesn't update the mouse if debug is disabled`, () => {
    const $$$ = musketeers(createThreeResources());
    $$$.debug(false).simulate(C.CLICK);
    const mouse = $$$.store.get(C.MOUSE);
    const display = mouse.css('display');
    expect(display).toBe('none');
  });

});