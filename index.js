'use strict';

var fs = require('fs');
var path = require('path');

/**
 * default require path.
 */
var root = process.cwd();

/**
 * change require path.
 */
exports.init = function (name) {
  if (!fs.statSync(name).isDirectory()) {
    throw new Error('`' + name + '` is not directory.');
  }
  root = name;
  return exports;
};

/**
 * require.
 *  - using('mymodule') to require under `root` modules, if path of arg is found.
 *  - using('mongoose') to require under `node_modules` modules, if path of arg is not found.
 */
exports.using = function (name) {
  try {
    return require(name);
  } catch (e) {}

  return require(path.join(root, name));
};

