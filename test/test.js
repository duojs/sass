'use strict';

var Duo = require('duo');
var path = require('path');
var fixture = path.join.bind(path, __dirname, 'fixtures');
var read = require('fs').readFileSync;
var sass = require('../');
var test = require('ava');

test('should transpile sass to css', function (t) {
  t.plan(2);

  var root = fixture('simple');
  var expected = read(fixture('simple/expected.css'), 'utf8');
  var duo = new Duo(root)
    .entry('index.scss')
    .use(sass());

  duo.run(function (err, css) {
    t.assert(!err, err);
    t.assert(css === expected);
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
    t.assert(css === expected);
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
    t.assert(css === expected);
  });
});
