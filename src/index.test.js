// dependencies
import _ from 'lodash';

// local dependencies
import module from '../package';
import musketeers from './index';
import C from './constants/constants';
import { resources } from './util/helpers';
import { initMocks, createThreeResources } from './util/testUtils';
import * as rootComponents from './rootComponents/rootComponents';

beforeEach(initMocks);

describe(`${module.name}: ${module.version}`, () => {
  test(`exists`, () => {
    const $$$ = musketeers();
    expect($$$).toBeDefined();
  });

  test(`package name is exposed`, () => {
    const $$$ = musketeers();
    expect($$$[C.NAME]).toBe(module.NAME);
  });

  test(`constants are exposed`, () => {
    const $$$ = musketeers();
    expect($$$.constants).toBeTruthy();
    _.each($$$.constants, (value, key) => {
      expect(value).toBe(C[key]);
    });
  });

  test('store is exposed', () => {
    const $$$ = musketeers();
    expect($$$.store).toBeDefined();
  });

  test('all root components exist', () => {
    const $$$ = musketeers();
    _.each(rootComponents, (method, key) => {
      expect($$$[key]).toEqual(method);
    });
  });

  test('store is reset on init', () => {
    const snapshot = musketeers().store.snapshot();
    _.each(resources, (resource) => {
      expect(snapshot[resource]).toBe(null);
    });
  });

  test('configures instance if resources are provided', () => {
    const $$$ = musketeers(createThreeResources());
    const snapshot = $$$.store.snapshot();
    _.each(resources, (resource) => {
      expect(snapshot[resource]).not.toBe(null);
    });
  });
});