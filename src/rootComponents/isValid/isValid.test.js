// local dependencies
import C from '../../constants/constants';
import musketeers from '../../index';
import { initMocks } from '../../util/testUtils';

beforeEach(initMocks);

describe('[root] isValid', () => {
  test(`returns false and console.error when resources aren't provided`, () => {
    const $$$ = musketeers();
    const isValid = $$$.isValid();
    expect(isValid).toBe(false);
    expect(mocks.console.error).toHaveBeenCalledTimes(3);
  });

  test(`returns true without console.error when resources are provided`, () => {
    const $$$ = musketeers({
      [C.SCENE]: jest.fn(),
      [C.RENDERER]: jest.fn(),
      [C.CAMERA]: jest.fn()
    });
    expect($$$.isValid()).toBe(true);
    expect(mocks.console.error).not.toHaveBeenCalled();
  });
});