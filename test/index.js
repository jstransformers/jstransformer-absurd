/**
 * jstransformer-absurd <https://github.com/tunnckoCore/jstransformer-absurd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var test = require('assertit');
var transformer = require('jstransformer');
var transform = transformer(require('../index'));

test('should throw TypeError if not a function or object given', function(done) {
  function fixture() {
    transform.render();
  }
  test.throws(fixture, TypeError);
  test.throws(fixture, /jstransformer-absurd expects object or function/);
  done();
});

test('should throw Error when file not found', function(done) {
  function fixture() {
    transform.renderFile('./enoent-file.js');
  }
  test.throws(fixture, Error);
  done();
});

test('should render HTML with minify true, synchronously', function(done) {
  var fixture = require('./morph.js');
  var actual = transform.render(fixture, {minify: true, morph: 'html'});
  var expected = '<section class="page"><h2>Hello kitty!</h2></section>';

  test.equal(actual.body, expected);
  done();
});

test('should render CSS with minify true, async/promise', function(done) {
  var fixture = require('./morph.js');
  var promise = transform.renderAsync(fixture, {minify: true, morph: 'css'});
  var expected = '.content{font-style: 20px;padding: 0;}.content p{line-height: 30px;}';

  promise.then(function(actual) {
    test.equal(actual.body, expected);
    done();
  });
});

test('should render CSS file from a given filepath', function(done) {
  var fixture = './test/advanced.css';
  var options = {minify: true};
  var actual = transform.renderFile(fixture, options);
  var expected = fs.readFileSync('./test/advanced.min.css', 'utf8');

  test.equal(actual.body, expected);
  done();
});

test('should render JS file from a given filepath', function(done) {
  var fixture = './test/advanced.js';
  var options = {minify: false};
  var promise = transform.renderFileAsync(fixture, options);
  var expected = fs.readFileSync('./test/advanced.expected.css', 'utf8');

  promise.then(function(actual) {
    test.equal(actual.body, expected);
    done();
  });
});
