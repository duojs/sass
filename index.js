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

    file.src = sass(assign(opts, {
      data: file.src,
      indentedSyntax: file.type === 'sass'
    }));

    file.type = 'css';
  };
};
