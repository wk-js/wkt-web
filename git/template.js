//api('file')
//api('stack')
//api('exec')

after('make', 'git:init', function() {
  // exec('git init')
})

before('bundle', function() {
  chunkAdd('application:module:git', `this.module( require('../workflow/modules/git.js') )`)
})

after('bundle', function() {
  template('config/application.js')
})