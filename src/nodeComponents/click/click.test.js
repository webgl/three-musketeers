// local dependencies
import C from '../../constants/constants';
import musketeers from '../../index';
import {
  initMocks,
  createThreeResources,
  addBoxToScene
} from '../../util/testUtils';

beforeEach(initMocks);

describe('[node] click', () => {

  test(`is chainable returning node`, () => {
    const $$$ = musketeers(createThreeResources());
    const NAME = 'SAMPLE';
    addBoxToScene($$$, NAME);
    const node = $$$.find(NAME);
    expect(node.click()).toBe(node);
  });

  test(`clicks the screen based on the node position`, () => {
    const $$$ = musketeers(createThreeResources());
    const mockClick = jest.fn();
    const NAME = 'SAMPLE';
    addBoxToScene($$$, NAME);
    $$$
    .find(NAME)
    .on('click', mockClick)
    .click();
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test(`passes debug to the click`, () => {
    const $$$ = musketeers(createThreeResources());
    const NAME = 'SAMPLE';
    addBoxToScene($$$, NAME);
    $$$.find(NAME).click(false);
    expect($$$.store.get(C.MOUSE).css('display')).toBe('none');
    $$$.find(NAME).click(true);
    expect($$$.store.get(C.MOUSE).css('display')).toBe('block');
  });

  test(`triggers 'click' event handlers on node`, () => {
    const $$$ = musketeers(createThreeResources());
    const mockClick = jest.fn();
    const NAME = 'SAMPLE';
    addBoxToScene($$$, NAME);
    $$$
    .find(NAME)
    .on('click', mockClick)
    .click();
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

});