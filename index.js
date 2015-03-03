'use strict';

var assign = require('object-assign');
var debug = require('debug')('duosass');
var sass = require('node-sass').renderSync;

module.exports = function (opts) {
	opts = opts || {};

	return function (file) {
		if (file.type !== 'scss' && file.type !== 'sass') {
			return;
		}

		debug('compiling %s to css', file.id);

		var result = sass(assign({
			data: file.src,
			includePaths: [file.root],
			indentedSyntax: file.type === 'sass'
		}, opts));

		file.src = result.css;
		file.type = 'css';
	};
};
