// dependencies
import _ from 'lodash';

// local dependencies
import C from '../../constants/constants';
import musketeers from '../../index';
import { resources } from '../../util/helpers';
import * as nodeComponents from '../../nodeComponents/nodeComponents';
import { initMocks, createThreeResources } from '../../util/testUtils';

beforeEach(initMocks);

describe('[root] getResource', () => {

  test(`return resource`, () => {
    const resources = createThreeResources();
    const $$$ = musketeers(resources);
    expect($$$.getResource(C.SCENE)).toEqual(resources[C.SCENE]);
  });

  test(`returned node resource has all node components`, () => {
    const $$$ = musketeers(createThreeResources());
    _.each(resources, (resource) => {
      const received = _.keys($$$.getResource(resource));
      const expected = expect.arrayContaining(_.keys(nodeComponents));
      expect(received).toEqual(expected);
    });
  });

  test(`does not return unset resources`, () => {
    const $$$ = musketeers();
    expect($$$.getResource(C.SCENE).exists()).toBe(false);
  });

  test(`does not attach nodeComponents if not a resource`, () => {
    const $$$ = musketeers();
    expect($$$.getResource('INVALID')).toBe(false);
  });

  test(`prints warning if not a resource`, () => {
    expect(mocks.console.warn).not.toHaveBeenCalled();
    musketeers().getResource('INVALID');
    expect(mocks.console.warn).toHaveBeenCalledTimes(1);
  });

});