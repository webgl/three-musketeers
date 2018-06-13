// dependencies
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

// local dependencies
const paths = require('../config/paths');

const ROOT_COMPONENTS = 'rootComponents';
const NODE_COMPONENTS = 'nodeComponents';

const getInfo = (type) => ({
  type,
  file: path.join(paths.appSrc, `${type}/${type}.js`),
  directory: path.join(paths.appSrc, `${type}`)
});

const writeRecordToFile = (filePath, files) => {
  _.each(files, (file) => {
    if (_.includes(file, '.')) return;
    const data = `export { default as ${file} } from './${file}/${file}';\n`;
    fs.appendFileSync(filePath, data);
  });
};

const writeHeaderToFile = (info) => {
  const header = {
    [ROOT_COMPONENTS]: `/**
* Root components are methods that are available on the root instance.
*
* @module rootComponents
* 
* @example
* import musketeers from 'three-musketeers';
*
* // $$$ is now the root node with all rootComponents provided
* const $$$ = musketeers({ renderer, scene, camera });
*/\n`,
    [NODE_COMPONENTS]: `/**
* Node components are methods that are attached to elements returned via root methods.
*
* @module nodeComponents
* 
* @example
* import musketeers from 'three-musketeers';
*
* // $$$ is now the root node with all rootComponents provided
* const $$$ = musketeers({ renderer, scene, camera });
*
* $$$
* .find('Cube_1') // this returns a node
* .click() // where click is one of the components provided on this returned node
*/\n`
  }[info.type];
  fs.appendFileSync(info.file, header);
};

_.each([
  getInfo(ROOT_COMPONENTS),
  getInfo(NODE_COMPONENTS)
], (info) => {
  // clean
  fs.writeFileSync(info.file, '');
  // read
  const files = fs.readdirSync(info.directory);
  // write headers
  writeHeaderToFile(info);
  // write components
  writeRecordToFile(info.file, files);
});


