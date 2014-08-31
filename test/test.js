'use strict';

var Duo = require('duo');
var path = require('path');
var fixture = path.join.bind(path, __dirname, 'fixtures');
var read = require('fs').readFile;
var sass = require('../');
var test = require('ava');

test('should transpile sass to css', function (t) {
  t.plan(3);

  var root = fixture('simple');
  var duo = new Duo(root)
    .entry('index.scss')
    .use(sass());

  duo.run(function (err, a) {
    t.assert(!err);

    read(path.join(root, 'index.css'), 'utf8', function (err, b) {
      t.assert(!err);
      t.assert(a === b);
    });
  });
});

test('should resolve imports', function (t) {
  t.plan(3);

  var root = fixture('import');
  var duo = new Duo(root)
    .entry('index.scss')
    .use(sass());

  duo.run(function (err, a) {
    t.assert(!err);

    read(path.join(root, 'index.css'), 'utf8', function (err, b) {
      t.assert(!err);
      t.assert(a === b);
    });
  });
});
