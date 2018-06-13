// local dependencies
import C from '../../constants/constants';
import musketeers from '../../index';
import {
  initMocks,
  addBoxToScene,
  createThreeResources
} from '../../util/testUtils';

beforeEach(initMocks);

describe('[node] on', () => {

  test(`it attaches the callback to the matching node`, () => {
    const $$$ = musketeers(createThreeResources());
    const mockedTrigger = jest.fn();
    const SAMPLE = 'SAMPLE';
    addBoxToScene($$$, SAMPLE);

    $$$
    .find(SAMPLE)
    .on(C.CLICK, mockedTrigger)
    .click();

    expect(mockedTrigger).toHaveBeenCalledTimes(1);
  });

  test(`it attaches multiple callbacks to the matching node`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    addBoxToScene($$$, SAMPLE);

    const mockedTrigger1 = jest.fn();
    const mockedTrigger2 = jest.fn();

    $$$
    .find(SAMPLE)
    .on(C.CLICK, mockedTrigger1)
    .on(C.CLICK, mockedTrigger2)
    .click();

    expect(mockedTrigger1).toHaveBeenCalledTimes(1);
    expect(mockedTrigger2).toHaveBeenCalledTimes(1);
  });

});