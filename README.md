# jstransformer-absurd

[Absurd](http://absurdjs.com) support for [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-absurd/master.svg)](https://travis-ci.org/jstransformers/jstransformer-absurd)
[![Coverage Status](https://img.shields.io/coveralls/jstransformers/jstransformer-absurd/master.svg)](https://coveralls.io/r/jstransformers/jstransformer-absurd?branch=master)
[![Dependency Status](https://img.shields.io/david/jstransformers/jstransformer-absurd/master.svg)](http://david-dm.org/jstransformers/jstransformer-absurd)
[![NPM version](https://img.shields.io/npm/v/jstransformer-absurd.svg)](https://www.npmjs.org/package/jstransformer-absurd)

## Installation

    npm install jstransformer-absurd

## API

```js
var absurd = require('jstransformer')(require('jstransformer-absurd'))

var input = "h1: Hello <% name %>!";
var options = {
  "morph": "html",
  "type": "yaml"
};
var locals = {
  "name": "World"
};

absurd.render(input, options, locals).body
//=> '<h1>Hello World!</h1>'
```

## License

MIT
