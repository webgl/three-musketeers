// local dependencies
import musketeers from '../../index';
import {
  initMocks,
  addBoxToScene,
  createThreeResources
} from '../../util/testUtils';

beforeEach(initMocks);

describe('[node] hasChildren', () => {

  test(`returns false is node doesn't have children`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    addBoxToScene($$$, SAMPLE);
    expect($$$.find(SAMPLE).hasChildren()).toBe(false);
  });

  test(`returns true is node does have children`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    const mesh = addBoxToScene($$$, SAMPLE);
    mesh.children = [1, 2, 3];
    expect($$$.find(SAMPLE).hasChildren()).toBe(true);
  });

});