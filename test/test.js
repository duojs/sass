'use strict';

var read = require('fs').readFileSync;
var path = require('path');
var test = require('ava');
var Duo = require('duo');
var sass = require('../');
var fixture = path.join.bind(path, __dirname, 'fixtures');

test('should transpile sass to css', function (t) {
	t.plan(2);

	var root = fixture('simple');
	var expected = read(fixture('simple/expected.css'), 'utf8');
	var duo = new Duo(root)
		.entry('index.scss')
		.use(sass());

	duo.run(function (err, css) {
		t.assert(!err, err);
		t.assert(css.code === expected);
	});
});

test('should transpile sass to css using indented syntax', function (t) {
	t.plan(2);

	var root = fixture('indented');
	var expected = read(fixture('indented/expected.css'), 'utf8');
	var duo = new Duo(root)
		.entry('index.sass')
		.use(sass());

	duo.run(function (err, css) {
		t.assert(!err, err);
		t.assert(css.code === expected);
	});
});

test('should transpile sass with imports to css', function (t) {
	t.plan(2);

	var root = fixture('import');
	var expected = read(fixture('import/expected.css'), 'utf8');
	var duo = new Duo(root)
		.entry('index.scss')
		.use(sass());

	duo.run(function (err, css) {
		t.assert(!err, err);
		t.assert(css.code === expected);
	});
});

test('should transpile sass with remote imports to css', function (t) {
	t.plan(2);

	var root = fixture('remote');
	var expected = read(fixture('remote/expected.css'), 'utf8');
	var duo = new Duo(root)
		.entry('index.scss')
		.use(sass());

	duo.run(function (err, css) {
		t.assert(!err, err);
		t.assert(css.code === expected);
	});
});
