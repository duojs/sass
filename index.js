'use strict';

var assign = require('object-assign');
var debug = require('debug')('duosass');
var sass = require('node-sass').renderSync;

/**
 * Compile Sass to CSS
 *
 * @param {Object} [opts]
 * @api public
 * @return {Function}
 */

module.exports = function (opts) {
  opts = opts || {};

  return function (file) {
    if (file.type !== 'scss' && file.type !== 'sass') {
      return;
    }

    debug('compiling %s to css', file.id);

    var imports = file.src.match(/@import[^;]*;/) || [];
    file.src = file.src.replace(/@import[^;]*;/, '');
    var sass_syntax = (file.type === 'sass') ? true : false;

    file.src = sass(assign(opts, {data: file.src, indentedSyntax: sass_syntax}));
    for (var i=0;i<imports.length;i++) {
      file.src = imports[i] + file.src;
    }
    file.type = 'css';
  };
};