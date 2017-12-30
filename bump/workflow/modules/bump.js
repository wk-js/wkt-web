'use strict'

module.exports = function() {
  this.config.bump = {
    version: require(this.root + '/package.json').build_version
  }
}