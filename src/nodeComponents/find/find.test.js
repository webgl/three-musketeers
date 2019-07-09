// local dependencies
import * as THREE from 'three';
import musketeers from '../../index';
import {
  initMocks,
  addBoxToScene,
  createThreeResources
} from '../../util/testUtils';

beforeEach(initMocks);

describe('[node] find', () => {

  test('returns matching child nodes', () => {
    const $$$ = musketeers(createThreeResources());
    const SAMPLE = 'SAMPLE';

    expect($$$.find(SAMPLE).exists()).toBe(false);

    const mesh = addBoxToScene($$$, SAMPLE);
    expect($$$.find(SAMPLE).exists()).toBe(true);

    const childMesh = new THREE.Mesh(new THREE.BoxGeometry());
    childMesh.name = `${SAMPLE}_CHILD`;
    expect($$$.find(SAMPLE).find(childMesh.name).exists()).toBe(false);
    mesh.add(childMesh);
    expect($$$.find(SAMPLE).find(childMesh.name).exists()).toBe(true);
  });

});