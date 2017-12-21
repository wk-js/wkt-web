//api('file')
//api('stack')
//api('exec')
//api('template')

// after('make', 'git:init', function() {
//   // exec('git init')
// })

before('bundle', function() {
  chunkAdd('application:module:git', `this.module( require('../workflow/modules/git.js') )`)
})

invocator().insertAfter('bundle', function() {
  template('config/application.js')
})