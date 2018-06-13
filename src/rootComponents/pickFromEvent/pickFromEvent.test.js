// local dependencies
import C from '../../constants/constants';
import musketeers from '../../index';
import { initMocks, createThreeResources } from '../../util/testUtils';

beforeEach(initMocks);

describe('[root] pickFromEvent', () => {

  test(`updates mouse position based on event`, () => {
    const $$$ = musketeers(createThreeResources()).debug();
    const e = { clientX: '100px', clientY: '100px' };
    $$$.pickFromEvent(e);
    const mouse = $$$.store.get(C.MOUSE);
    const left = mouse.css('left');
    expect(left).toBe(e.clientX);
    const top = mouse.css('top');
    expect(top).toBe(e.clientY);
    const display = mouse.css('display');
    expect(display).toBe('block');
  });

  test(`uses raycaster to intersect scene`, () => {
    const $$$ = musketeers(createThreeResources());
    const raycaster = $$$.store.get(C.RAYCASTER);
    raycaster.setFromCamera = jest.fn();
    raycaster.intersectObject = jest.fn();
    $$$.pickFromEvent({});
    expect(raycaster.setFromCamera).toHaveBeenCalledTimes(1);
    expect(raycaster.intersectObject).toHaveBeenCalledTimes(1);
  });

});