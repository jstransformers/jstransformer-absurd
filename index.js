'use strict'

var initialAbsurd = require('absurd')
var merge = require('merge')

exports.name = 'absurd'
exports.inputFormats = ['absurd', 'absurdjs']
// Absurd can output results in multiple formats. We output with 'absurd'
// to refrain from making an asumption on how it will be used.
exports.outputFormat = 'absurd'

/**
 * Given the options and locals, will construct an Absurd object.
 */
function constructAbsurd(options, locals) {
  // Build a base Absurd object.
  var absurd = initialAbsurd()

  // Retrieve the options.
  options = merge(options || {}, locals || {})

  // Check if we are to morph the object.
  if (options.morph) {
    absurd.morph(options.morph)
  }

  return absurd
}

/**
 * Build an Absurd object from the given input, options and locals.
 */
function getAbsurdFromRender(input, options, locals) {
  var absurd = constructAbsurd(options, locals)

  switch (options.type) {
    case 'javascript':
      // TODO: Enable rendering Absurd JavaScript with .render(). Perhaps by
      // using eval() to get the API module.exports object?
      absurd.raw('Using Absurd\'s .render() with JavaScript is disabled.')
      break
    case 'yaml':
      var yaml = require('js-yaml')
      absurd.add(yaml.safeLoad(input))
      break
    case 'css':
      absurd.importCSS(input)
      break
    case 'json':
    default:
      absurd.add(JSON.parse(input))
      break
  }

  return absurd
}

/**
 * Construct an Absurd object from a filename, options and locals.
 */
function getAbsurdFromFile(filename, options, locals) {
  var absurd = constructAbsurd(options, locals)
  absurd.import(filename)
  return absurd
}

exports.render = function (input, options, locals) {
  return getAbsurdFromRender(input, options, locals).compile(options)
}

exports.renderAsync = function (input, options, locals) {
  return new Promise(function (resolve, reject) {
    getAbsurdFromRender(input, options, locals).compile(options, function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.renderFile = function (input, options, locals) {
  return getAbsurdFromFile(input, options, locals).compile(options)
}

exports.renderFileAsync = function (input, options, locals) {
  return new Promise(function (resolve, reject) {
    getAbsurdFromFile(input, options, locals).compile(options, function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
