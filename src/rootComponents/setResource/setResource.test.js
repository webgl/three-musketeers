// dependencies
import _ from 'lodash';
import * as THREE from 'three';

// local dependencies
import C from '../../constants/constants';
import musketeers from '../../index';
import { resources } from '../../util/helpers';
import { initMocks, createThreeResources, createNode } from '../../util/testUtils';

beforeEach(initMocks);

describe('[root] setResource', () => {

  test(`is chainable`, () => {
    const $$$ = musketeers();
    expect($$$.setResource(createThreeResources())).toBe($$$);
  });

  test(`sets individual resources`, () => {
    _.each(resources, (resource) => {
      const $$$ = musketeers();
      expect($$$.getResource(resource).exists()).toBe(false);
      $$$.setResource(resource, createNode());
      expect($$$.getResource(resource).exists()).toBe(true);
    });
  });

  test(`sets resources with an object`, () => {
    const $$$ = musketeers(createThreeResources());
    expect($$$.getResource(C.SCENE).exists()).toBe(true);
    expect($$$.getResource(C.CAMERA).exists()).toBe(true);
    expect($$$.getResource(C.RENDERER).exists()).toBe(true);
  });

  test(`doesn't set invalid resources and console.error`, () => {
    const $$$ = musketeers();
    $$$.setResource('INVALID');
    expect(mocks.console.error).toHaveBeenCalledTimes(1);
  });

  test(`attaches a camera if one is not provided at runtime`, (done) => {
    const resources = createThreeResources();
    delete resources[C.CAMERA];
    const $$$ = musketeers(resources);
    expect($$$.getResource(C.CAMERA).exists()).toBe(false);
    setTimeout(() => {
      $$$.getResource(C.SCENE).add(new THREE.PerspectiveCamera());
      expect($$$.getResource(C.CAMERA).exists()).toBe(false);
      done();
    }, 1000);
  });
});