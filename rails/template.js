---
apis:
  - file
  - boilerplate
---
store('root').set('use_rails', true)

// Overwrite asset_url and asset_path for rails support
addFile('rails_asset.js', { rename: 'workflow/webpack/loader/stylus/imports/asset.js' })

stack().before('bundle', 'rails:configs', function() {
  if (store('root').get('use_environment')) {
    addFile('environments/**/*', { base_dir: 'config' })
  }
})

stack('root').after('skeleton:prompt', 'rails:chunks', function() {

  let content = `
    this.assets.load_path = './app'
    this.assets.dst_path = '../app/assets'
    this.assets.cacheable = false
    this.assets.save_manifest = true
    this.assets.force_resolve = true
    this.assets.asset_key = 'my_hash_key'
`

  if (!store('root').get('use_environment')) {
    content += `
    this.entry('styles/index.styl', 'stylesheets/main.css.erb')
    this.entry('scripts/index.js', 'javascripts/main.js')
    this.entry('scripts/vendor/index.js', 'javascripts/vendor.js')`
  }

  chunk().add('application:setup:assets', content)

})