/**
 * jstransformer-absurd <https://github.com/tunnckoCore/jstransformer-absurd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var absurd = require('absurd')();
var transformer = require('jstransformer');
var postcss = transformer(require('jstransformer-postcss'));
var nested = require('postcss-nested');

exports.name = 'absurd';
exports.inputFormats = ['absurd', 'absurdjs', 'js'];
exports.outputFormat = 'css';

exports.render = function _render(api, options) {
  var isFunction = typeof api === 'function';

  if (!isFunction && typeof api !== 'object') {
    throw new TypeError('jstransformer-absurd expects object or function');
  }
  if (isFunction) {
    api = api(absurd, options);
  }

  // kinda weird, lol?
  return api.compile(function() {}, options);
};

exports.renderFile = function _renderFile(filepath, options) {
  var fn = null;
  try {
    fn = require(path.resolve(filepath));
  } catch(err) {
    if (err.message.indexOf('Unexpected token') === -1) {
      throw err;
    }
    var data = JSON.parse(postcss.renderFile(filepath, options, [nested]).body);

    fn = api.importCSS(data.css);
  }
  return exports.render(fn, options);
};
