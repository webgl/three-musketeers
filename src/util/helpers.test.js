// dependencies
import _ from 'lodash';

// local dependencies
import C from '../constants/constants';
import musketeers from '../index';
import * as helpers from './helpers';
import * as nodeComponents from '../nodeComponents/nodeComponents';
import {
  initMocks,
  createThreeResources,
  addBoxToScene,
  addBoxesToScene,
  createCanvas
} from './testUtils';

beforeEach(initMocks);

describe('attachNodeComponents', () => {

  test('exists', () => {
    expect(helpers.attachNodeComponents).not.toBeUndefined();
  });

  test('attaches all nodeComponents', () => {
    const $$$ = musketeers(createThreeResources());
    const mesh = helpers.attachNodeComponents(
      addBoxToScene($$$)
    );
    _.each(nodeComponents, (component, key) => {
      expect(mesh[key]).not.toBeUndefined();
    });
  });

});

describe('getID', () => {

  test('exists', () => {
    expect(helpers.getID).not.toBeUndefined();
  });

  test('converts node.name into id', () => {
    const node = { name: 'SAMPLE' };
    expect(helpers.getID(node)).toBe(node.name);
  });

  test('converts node.name and other arguments into id', () => {
    const others = [1, 2, 3];
    const node = { name: 'SAMPLE' };
    expect(helpers.getID(node, others)).toBe(`${node.name}:1,2,3`);
  });

});

describe('getCallbackID', () => {

  test('exists', () => {
    expect(helpers.getCallbackID).not.toBeUndefined();
  });

  test('converts node.name into id', () => {
    const node = { name: 'SAMPLE' };
    expect(helpers.getCallbackID(node, C.CLICK))
    .toBe(`${C.CALLBACK_STORE}.${node.name}:${C.CLICK}`);
  });

});

describe('print', () => {

  test('exists', () => {
    expect(helpers.print).not.toBeUndefined();
  });

  test('prints message with various message types', () => {
    _.each(['warn', 'info', 'log', 'error'], (type) => {
      helpers.print('SAMPLE', type);
      expect(mocks.console[type]).toHaveBeenCalledTimes(1);
    });
  });

});

describe('findBy', () => {

  test('exists', () => {
    expect(helpers.findBy).not.toBeUndefined();
  });

  test('returns empty array if none matching', () => {
    const $$$ = musketeers(createThreeResources());
    addBoxToScene($$$);
    expect(helpers.findBy('INVALID').length).toBe(0);
  });

  test('finds matching item', () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    const mesh = addBoxToScene($$$, SAMPLE);
    expect(helpers.findBy(SAMPLE)[0].name).toBe(mesh.name);
  });

  test('finds all matching item recursively', () => {
    const $$$ = musketeers(createThreeResources());
    const COUNT = 10;
    const SAMPLE = 'SAMPLE';
    addBoxesToScene($$$, SAMPLE, COUNT);
    expect(helpers.findBy(SAMPLE, true).length).toBe(COUNT);
  });

});

describe('updateMousePosition', () => {

  test('exists', () => {
    expect(helpers.updateMousePosition).not.toBeUndefined();
  });

  test('updates mouse position if debug mode is enabled', () => {
    const $$$ = musketeers(createThreeResources()).debug();
    const event = { clientX: 100, clientY: 100 };
    helpers.updateMousePosition(event);
    expect($$$.store.get(C.MOUSE).css('display')).toBe('block');
    expect($$$.store.get(C.MOUSE).css('left')).toBe(`${event.clientX}px`);
    expect($$$.store.get(C.MOUSE).css('top')).toBe(`${event.clientY}px`);
  });

  test('updates mouse position if debug is passed in', () => {
    const $$$ = musketeers(createThreeResources());
    const event = { clientX: 100, clientY: 100 };
    helpers.updateMousePosition(event);
    expect($$$.store.get(C.MOUSE).css('display')).toBe('none');
    helpers.updateMousePosition(event, true);
    expect($$$.store.get(C.MOUSE).css('display')).toBe('block');
  });

});

describe('resources', () => {

  test('exists', () => {
    expect(helpers.resources).not.toBeUndefined();
  });

  test('contains all necessary resources', () => {
    _.each([C.RENDERER, C.CAMERA, C.SCENE], (resource) => {
      expect(_.includes(helpers.resources, resource)).toBe(true);
    });
  });

});

describe('worldToScreenSpace', () => {

  test('exists', () => {
    expect(helpers.worldToScreenSpace).not.toBeUndefined();
  });

});

describe('worldToClipSpace', () => {

  test('exists', () => {
    expect(helpers.worldToClipSpace).not.toBeUndefined();
  });

});

describe('clipToScreenSpace', () => {

  test('exists', () => {
    expect(helpers.clipToScreenSpace).not.toBeUndefined();
  });

  test('accurately converts clip to clip space', () => {
    const canvas = createCanvas();
    expect(helpers.clipToScreenSpace(-1, -1, canvas)).toEqual({ x: 0, y: 1000 });
    expect(helpers.clipToScreenSpace(0, 0, canvas)).toEqual({ x: 500, y: 500 });
    expect(helpers.clipToScreenSpace(1, 1, canvas)).toEqual({ x: 1000, y: 0 });
  });

});

describe('screenToClipSpace', () => {

  test('exists', () => {
    expect(helpers.screenToClipSpace).not.toBeUndefined();
  });

  test('accurately converts screen to clip coords', () => {
    const canvas = createCanvas();
    expect(helpers.screenToClipSpace(0, 0, canvas)).toEqual({ x: -1, y: 1 });
    expect(helpers.screenToClipSpace(500, 500, canvas)).toEqual({ x: 0, y: 0 });
    expect(helpers.screenToClipSpace(1000, 1000, canvas)).toEqual({ x: 1, y: -1 });
  });

});