---
apis:
  - file
  - boilerplate
---
store('root', 'use_rails', true)

// Overwrite asset_url and asset_path for rails support
addFile('rails_asset.js', { rename: 'workflow/webpack/loader/stylus/imports/asset.js' })