'use strict'

module.exports = function() {

  const stylus = require('stylus')
  const nodes  = stylus.nodes

  return function(styl) {

    styl.define('asset_path', function( strObject ) {
      return new nodes.Literal('url(<%= asset_path("' + strObject.string + '") %>")')
    })

    styl.define('asset_url', function( strObject ) {
      return new nodes.Literal('url("<%= asset_url("' + strObject.string + '") %>")')
    })

  }

}