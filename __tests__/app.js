'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-javascript-plugin:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'react-webpack'
    });
  });

  it('creates files', () => {
    assert.file(['build/webpack.common.js']);
    assert.file(['src']);
    assert.file(['package.json']);
    assert.file(['babel.config.js']);
  });
});
