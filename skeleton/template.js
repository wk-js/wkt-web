---
apis:
  - file
  - boilerplate
  - prompt
  - exec
---
const { join } = require('path')

addFile('**/*')
ignoreFile('template.js')
addFile('.eslintrc.yml')

templateFile('README.md', true)
templateFile('config/application.js', true)
templateFile('Wkfile', true)

RootStack().before('bundle', 'skeleton:prompt', function() {
  return RootAPI()
  .prompt('Project name:', 'project_name')
  .then(function( project_name ) {

    if (RootStore('use_rails')) {
      chunk().add('application:setup:assets', `
      this.assets.load_path     = './app'
      this.assets.dst_path      = '../app/assets'
      this.assets.cacheable     = false
      this.assets.save_manifest = true
      this.assets.force_resolve = true
      this.assets.asset_key     = 'my_hash_key'

      this.entry('styles/index.styl', 'stylesheets/main.css.erb')
      this.entry('scripts/index.js', 'javascripts/main.js')
      this.entry('scripts/vendor/index.js', 'javascripts/vendor.js'`)
    } else {
      chunk().add('application:setup:assets', `
      this.assets.load_path     = './app'
      this.assets.dst_path      = './public'
      this.assets.cacheable     = false
      this.assets.save_manifest = true
      this.assets.force_resolve = true
      this.assets.asset_key     = 'my_hash_key'

      this.assets.addFile( 'assets/**/*' )
      this.assets.manager.symlink('assets')

      this.entry('styles/index.styl', 'main.css')
      this.entry('scripts/index.js', 'main.js')
      this.entry('scripts/vendor/index.js', 'vendor.js')
      this.entry('views/index.html.ejs', 'index.html', { cache: false })
      this.entry('views/about.html.ejs', 'about.html', { cache: false })`)
    }

    output( join(output(), project_name) )

    RootAPI().templateData({
      project_name: project_name
    })

    editFile('package.json', function(c) {
      const content = JSON.parse(c.toString('utf8'))
      content['name'] = project_name
      content['version'] = "0.0.1"
      return JSON.stringify(content, null, 2)
    })

  })
})

RootStack().after('bundle', 'npm:install', function() {
  return exec('npm install')
})

chunk().add('wkfile:tasks', `
task('build',   [ 'application:run --copy', 'webpack --compress' ])
task('compile', [ 'application:run --copy', 'webpack --compile --debug' ])
task('watch'  , [ 'application:run --copy', 'webpack --watch --debug' ])
task('server' , [ 'application:run --copy', 'webpack --server' ])
task('deploy' , [ 'application:run --copy', 'aws:objects', 'aws:exception' ])`)