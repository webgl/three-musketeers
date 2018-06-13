// local dependencies
import musketeers from '../../index';
import { createThreeResources, addBoxesToScene, initMocks } from '../../util/testUtils';

beforeEach(initMocks);

describe('[root] find', () => {

  test(`returns empty item with non-matching name string`, () => {
    const $$$ = musketeers();
    expect($$$.find('INVALID').exists()).toBe(false);
  });

  test(`returns matched item with matching name string`, () => {
    const $$$ = musketeers(createThreeResources());
    const NAME = 'SAMPLE_GEOMETRY';
    addBoxesToScene($$$, NAME);
    expect($$$.find(NAME).exists()).toBe(true);
  });

  test(`returns matched item with passing validation function`, () => {
    const $$$ = musketeers(createThreeResources());
    const NAME = 'SAMPLE_GEOMETRY';
    addBoxesToScene($$$, NAME);
    expect($$$.find((n) => n.name === NAME).exists()).toBe(true);
  });

  test(`returns empty item with non-passing validation function`, () => {
    const $$$ = musketeers(createThreeResources());
    addBoxesToScene($$$);
    expect($$$.find((n) => n.type === 'INVALID').exists()).toBe(false);
  });

});