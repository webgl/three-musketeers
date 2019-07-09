// dependencies
import _ from 'lodash';

// local dependencies
import C from '../constants/constants';
import musketeers from '../index';
import {
  resources,
  initMocks,
  createThreeResources
} from '../util/testUtils';

beforeEach(initMocks);

describe(`store.snapshot`, () => {

  test(`exists`, () => {
    const $$$ = musketeers(createThreeResources());
    expect($$$.store.snapshot).not.toBeUndefined();
  });

  test(`returns the store state`, () => {
    const $$$ = musketeers(createThreeResources());
    expect($$$.store.snapshot()).not.toBeUndefined();
  });

});

describe(`store.get`, () => {

  test(`exists`, () => {
    const $$$ = musketeers(createThreeResources());
    expect($$$.store.get).not.toBeUndefined();
  });

  test(`returns values that are defined`, () => {
    const $$$ = musketeers(createThreeResources());
    _.each(resources, (resource) => {
      expect($$$.store.get(resource)).not.toBeUndefined();
    });
  });

  test(`returns undefined for undefined values`, () => {
    const $$$ = musketeers(createThreeResources());
    expect($$$.store.get('INVALID')).toBeUndefined();
  });

});

describe(`store.set`, () => {

  test(`exists`, () => {
    const $$$ = musketeers(createThreeResources());
    expect($$$.store.set).not.toBeUndefined();
  });

  test(`sets values`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    expect($$$
      .store
      .set(SAMPLE, SAMPLE)
      .get(SAMPLE)
    ).toBe(SAMPLE);
  });

  test(`sets callbackstore`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    const nestedKey = `${C.CALLBACK_STORE}.${SAMPLE}.${SAMPLE}`;
    expect($$$
      .store
      .set(nestedKey, SAMPLE)
      .get(nestedKey)
    ).toBe(SAMPLE);
  });

  test(`chainable store api`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    expect($$$.store.set(SAMPLE, SAMPLE)).toEqual($$$.store);
  });

});

describe(`store.reset`, () => {

  test(`exists`, () => {
    const $$$ = musketeers(createThreeResources());
    expect($$$.store.reset).not.toBeUndefined();
  });

  test(`resets store state`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    expect($$$
      .store
      .set(SAMPLE, SAMPLE)
      .get(SAMPLE)
    ).toBe(SAMPLE);

    expect($$$
      .store
      .reset()
      .get(SAMPLE)
    ).toBeUndefined();
  });

  test(`chainable store api`, () => {
    const $$$ = musketeers(createThreeResources());
    expect($$$.store.reset()).toEqual($$$.store);
  });

});