'use strict'

const AssetPipeline = require('asset-pipeline')

module.exports = function() {
  const AP    = new AssetPipeline
  this.assets = AP

  this.config.assets = {
    resolved: false
  }

  <%= chunk('assets:helpers') %>

  // Add configuration task
  this.configure.after('application:configure', 'assets:resolve', function() {
    // Resolve assets
    if (!this.config.assets.resolved) {
      this.assets.resolve()
      this.config.assets.resolved = true
    } else {
      this.assets._fetchManifest()
    }

    // Pass manifest to data
    this.data('assets', this.assets.CACHE)
  })

}