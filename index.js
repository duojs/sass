'use strict';

var assign = require('object-assign');
var debug = require('debug')('duosass');
var parseImport = require('parse-import');
var sass = require('node-sass').renderSync;

module.exports = function (opts) {
	opts = opts || {};

	return function (file) {
		if (file.type !== 'scss' && file.type !== 'sass') {
			return;
		}

		debug('compiling %s to css', file.id);

		var imports = parseImport(file.src).filter(function (imprt) {
			return imprt.path.indexOf('.') !== 0;
		}).map(function (imprt) {
			imprt.rule = imprt.rule + ';';
			file.src = file.src.replace(imprt.rule, '');
			return imprt.rule;
		});

		var result = sass(assign({
			data: file.src,
			includePaths: [file.root],
			indentedSyntax: file.type === 'sass'
		}, opts));

		file.src = imports.join('\n') + result.css;
		file.type = 'css';
	};
};
