// dependencies
import _ from 'lodash';

// local dependencies
import musketeers from '../../index';
import {
  initMocks,
  addBoxToScene,
  createThreeResources
} from '../../util/testUtils';

beforeEach(initMocks);

describe('[node] trigger', () => {

  test(`it triggers the callbacks for matching events`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    addBoxToScene($$$, SAMPLE);

    _.each(['mousemove', 'click', 'random'], (event) => {
      const mockedTrigger = jest.fn();

      $$$
      .find(SAMPLE)
      .on(event, mockedTrigger)
      .trigger(event);

      expect(mockedTrigger).toHaveBeenCalledTimes(1);
    });
  });

  test(`it doesn't trigger callbacks for non-matching events`, () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    addBoxToScene($$$, SAMPLE);

    _.each(['mousemove', 'click', 'random'], (event) => {
      const mockedTrigger = jest.fn();

      $$$
      .find(SAMPLE)
      .on('INVALID', mockedTrigger)
      .trigger(event);

      expect(mockedTrigger).toHaveBeenCalledTimes(0);
    });
  });

});