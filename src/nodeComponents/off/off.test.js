// dependencies
import _ from 'lodash';

// local dependencies
import C from '../../constants/constants';
import musketeers from '../../index';
import { initMocks, createThreeResources, addBoxesToScene } from '../../util/testUtils';

beforeEach(initMocks);

describe('[node] off', () => {

  test(`it turns off all callback for given event`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    addBoxesToScene($$$, SAMPLE);

    const mockClick1 = jest.fn();
    const mockClick2 = jest.fn();

    $$$
    .find(SAMPLE)
    .on(C.CLICK, mockClick1)
    .on(C.CLICK, mockClick2)
    .click();

    expect(mockClick1).toHaveBeenCalledTimes(1);
    expect(mockClick2).toHaveBeenCalledTimes(1);

    $$$
    .find(SAMPLE)
    .off(C.CLICK)
    .click();

    expect(mockClick1).toHaveBeenCalledTimes(1);
    expect(mockClick2).toHaveBeenCalledTimes(1);
  });

  test(`it turns off the matching supplied callback`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    addBoxesToScene($$$, SAMPLE);

    const mockClick1 = jest.fn();
    const mockClick2 = jest.fn();

    $$$
    .find(SAMPLE)
    .on(C.CLICK, mockClick1)
    .on(C.CLICK, mockClick2)
    .click();

    expect(mockClick1).toHaveBeenCalledTimes(1);
    expect(mockClick2).toHaveBeenCalledTimes(1);

    $$$
    .find(SAMPLE)
    .off(C.CLICK, mockClick1)
    .click();

    expect(mockClick1).toHaveBeenCalledTimes(1);
    expect(mockClick2).toHaveBeenCalledTimes(2);
  });

});