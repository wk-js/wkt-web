'use strict'

module.exports = function Application() {

  this.configure.add('application:initialize', () => {

    this.assets.load_path     = './app'
    this.assets.dst_path      = './public'
    this.assets.cacheable     = false
    this.assets.save_manifest = true
    this.assets.force_resolve = true
    this.assets.asset_key     = 'my_hash_key'

    {%= chunk('application:setup') %}

  })

  this.module(require('../workflow/modules/assets.js'))
  this.module(require('../workflow/modules/ejs.js'))
  this.module(require('../workflow/modules/webpack.js'))
  {%= chunk('application:module') %}

}