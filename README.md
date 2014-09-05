# duo-sass [![Build Status](https://travis-ci.org/duojs/sass.svg?branch=master)](https://travis-ci.org/duojs/sass)

> Sass plugin for Duo

## Install

```sh
$ npm install duosass
```

## Usage

From the CLI:

```sh
$ duo --use duosass input.scss output.css
```

Using the API:

```js
var Duo = require('duo');
var sass = require('duosass');

var duo = Duo(__dirname)
  .entry('index.scss')
  .use(sass());

duo.run(function (err, file) {
  if (err) {
    throw err;
  }

  console.log(file);
  //=> body div a { color: red }
});
```

## Options

See the node-sass [options](https://github.com/sass/node-sass#options).

## License

MIT © [duojs](http://duojs.org)
