//api('file')
//api('template')
//api('prompt')
//api('stack')

template('./workflow/modules/assets.js')

before('prompt', function() {
  ask('Use assets helpers?', 'use_asset_helpers')

  chunkBefore('application:setup', 'application:setup:assets', `
this.assets.LOAD_PATH          = './app'
this.assets.DST_PATH           = './public'
this.assets.KEEP_MANIFEST_FILE = true
this.assets.cacheable          = false
this.assets.debug              = true
  `)

  chunkBefore('application:module', 'application:module:assets', `
this.module( require('../workflow/modules/assets.js') )
  `)

  chunkAdd('Wkfile:assets', `wk.require('assets', true)`)

})

after('prompt', function() {

  if (answer('use_asset_helpers')) {
    chunkAdd('assets:helpers', `
  this.helper({
    asset_url(p, base_dir) {
      return AP.getUrl( p, base_dir )
    },

    asset_path(p, base_dir) {
      return AP.getPath( p, base_dir )
    }
  })
    `)
  } else {
    chunkAdd('assets:helpers', `
  this.chunks.add('helpers', function() {
    this.helper({
      asset_url(p, base_dir) {
        return p
      },

      asset_path(p, base_dir) {
        return p
      }
    })
  })
    `)
  }

})