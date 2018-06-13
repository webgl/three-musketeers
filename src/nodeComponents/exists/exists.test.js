// local dependencies
import musketeers from '../../index';
import {
  initMocks,
  addBoxToScene,
  createThreeResources
} from '../../util/testUtils';

beforeEach(initMocks);

describe('[node] exists', () => {

  test(`returns false is node doesn't exist`, () => {
    const $$$ = musketeers();
    expect($$$.find('INVALID').exists()).toBe(false);
  });

  test(`returns true is node exists`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    addBoxToScene($$$, SAMPLE);
    expect($$$.find(SAMPLE).exists()).toBe(true);
  });

});