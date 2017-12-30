'use strict'

const { normalize } = require('path')

module.exports = function(Application) {

  const config = {
    _entry: {},
    entry: {}
  }

  this.config.webpack = config

  this.entry = function entry(input, output, options) {
    config._entry[input] = output
    Application.assets.add(input, Object.assign({ rename: output, keepPath: false }, options))
  }

  // Prepare entry with correct path for webpack
  this.configure.after('assets:resolve', 'webpack:setup:entry', function() {
    Object.keys(config._entry).forEach((input) => {
      config._entry[input] = Application.assets.getPath(input).replace(/^\//, '')
      config.entry[config._entry[input]] = normalize(input)
    })
  })

}