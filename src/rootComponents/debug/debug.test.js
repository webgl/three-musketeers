// local dependencies
import C from '../../constants/constants';
import musketeers from '../../index';
import { initMocks } from '../../util/testUtils';

beforeEach(initMocks);

describe('[root] debug', () => {

  test(`is chainable`, () => {
    const $$$ = musketeers();
    expect($$$.debug()).toBe($$$);
  });

  test(`debug is off by default`, () => {
    const $$$ = musketeers();
    expect($$$.store.get(C.DEBUG)).toBe(false);
  });

  test(`set global debug to true with no argument`, () => {
    const $$$ = musketeers().debug();
    expect($$$.store.get(C.DEBUG)).toBe(true);
  });

  test(`set global debug to true with 'true' argument`, () => {
    const $$$ = musketeers().debug(true);
    expect($$$.store.get(C.DEBUG)).toBe(true);
  });

  test(`set global debug to false with 'false' argument`, () => {
    const $$$ = musketeers().debug(false);
    expect($$$.store.get(C.DEBUG)).toBe(false);
  });

  test(`makes mouse visible when debug is enabled`, () => {
    const $$$ = musketeers().debug();
    const display = $$$.store.get(C.MOUSE).css('display');
    expect(display).toBe('block');
  });

  test(`makes mouse visible when debug is enabled`, () => {
    const $$$ = musketeers().debug(false);
    const display = $$$.store.get(C.MOUSE).css('display');
    expect(display).toBe('none');
  });

});