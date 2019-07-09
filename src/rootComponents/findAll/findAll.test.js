// local dependencies
import musketeers from '../../index';
import { addBoxesToScene, initMocks, createThreeResources } from '../../util/testUtils';

beforeEach(initMocks);

describe('[root] findAll', () => {

  test(`returns empty item with non-matching name string`, () => {
    const $$$ = musketeers();
    expect($$$.findAll('INVALID')).toHaveLength(0);
  });

  test(`returns matched item with matching name string`, () => {
    const $$$ = musketeers(createThreeResources());
    const NAME = 'SAMPLE_GEOMETRY';
    addBoxesToScene($$$, NAME);
    expect($$$.findAll(NAME)).toHaveLength(1);
  });

  test(`returns all matched items with matching name string`, () => {
    const $$$ = musketeers(createThreeResources());
    const COUNT = 10;
    const NAME = 'SAMPLE_GEOMETRY';
    addBoxesToScene($$$, NAME, COUNT);
    expect($$$.findAll(NAME)).toHaveLength(COUNT);
  });

  test(`returns matched item with passing validation function`, () => {
    const $$$ = musketeers(createThreeResources());
    const NAME = 'SAMPLE_GEOMETRY';
    addBoxesToScene($$$, NAME);
    expect($$$.findAll((n) => n.name === NAME)).toHaveLength(1);
  });

  test(`returns all matched items with passing validation function`, () => {
    const $$$ = musketeers(createThreeResources());
    const COUNT = 10;
    const NAME = 'SAMPLE_GEOMETRY';
    addBoxesToScene($$$, NAME, COUNT);
    expect($$$.findAll((n) => n.name === NAME)).toHaveLength(COUNT);
  });

  test(`returns empty item with non-passing validation function`, () => {
    const $$$ = musketeers(createThreeResources());
    addBoxesToScene($$$);
    expect($$$.findAll((n) => n.type === 'INVALID')).toHaveLength(0);
  });

});