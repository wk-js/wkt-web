'use strict'

const AssetPipeline = require('asset-pipeline')

module.exports = function() {
  const AP = new AssetPipeline

  this.config.assets = {
    resolved: false
  }

  {{ chunk('assets:helpers') }}

  // Add configuration task
  this.configure.after('application:configure', 'assets:resolve', function() {
    // Resolve assets
    if (!this.config.assets.resolved) {
      AP.resolve()
      this.config.assets.resolved = true
    } else {
      AP._fetchManifest()
    }

    // Pass manifest to data
    this.config.assets.assets = AP.CACHE
    // this.data('assets', AP.CACHE)
  })

}