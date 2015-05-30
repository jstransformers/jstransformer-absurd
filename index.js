'use strict';

var Absurd = require('absurd');
var Promise = require('promise');
var merge = require('merge');

exports.name = 'absurd';
exports.inputFormats = ['absurd', 'absurdjs'];
// Absurd can output results in multiple formats. We output with "absurd"
// to refrain from making an asumption on how it will be used.
exports.outputFormat = 'absurd';

/**
 * Build an Absurd object from the given input, options and locals.
 */
var constructAbsurd = function (input, options, locals) {
  // Build a base Absurd object.
  var absurd = Absurd();

  // Retrieve the options.
  options = merge(options || {}, locals || {});

  // Check if we are to morph the object.
  if (options.morph) {
    absurd.morph(options.morph);
  }

  // Process the input for the object.
  if (typeof input == 'string' || input instanceof String) {
    try {
      var api = JSON.parse(input);
      absurd.add(api);
    }
    catch (e) {
      // It is not a JSON object, perhaps it's CSS?
      // TODO: Check if it's valid CSS beforehand.
      absurd.importCSS(input);
    }
  }
  else {
    // TODO: Any other ways we could process the input?
    absurd.add(input);
  }

  return absurd;
};

exports.render = function _render(input, options, locals) {
  return constructAbsurd(input, options, locals).compile(options);
};

exports.renderAsync = function _renderAsync(input, options, locals) {
  return new Promise(function (fulfill, reject) {
    constructAbsurd(input, options, locals).compile(options, function (err, result) {
      if (err) {
        reject(err);
      }
      else {
        fulfill(result);
      }
    });
  });
};
