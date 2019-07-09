// dependencies
import _ from 'lodash';

// local dependencies
import * as THREE from 'three';
import musketeers from '../../index';
import {
  initMocks,
  addBoxToScene,
  createThreeResources
} from '../../util/testUtils';

beforeEach(initMocks);

describe('[node] findAll', () => {

  test('returns all matching child nodes', () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';
    const CHILD_SAMPLE = `${SAMPLE}_CHILD`;

    expect($$$.findAll(SAMPLE).length).toBe(0);

    const mesh = addBoxToScene($$$, SAMPLE);
    expect($$$.findAll(SAMPLE).length).toBe(1);

    const COUNT = 10;
    _.times(COUNT, () => {
      const childMesh = new THREE.Mesh(new THREE.BoxGeometry());
      childMesh.name = CHILD_SAMPLE;
      mesh.add(childMesh);
    });

    expect($$$.find(SAMPLE).findAll(CHILD_SAMPLE).length).toBe(COUNT);
  });

});