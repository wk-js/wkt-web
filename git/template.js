//api('file')
//api('stack')
//api('exec')
//api('template')

// after('make', 'git:init', function() {
//   // exec('git init')
// })

template('config/application.js')

before('bundle', function() {
  chunkAdd('application:module:git', `this.module( require('../workflow/modules/git.js') )`)
})