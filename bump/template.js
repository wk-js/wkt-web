//api('file')
//api('stack')
//api('template')

before('bundle', function() {
  chunkBefore('application:module', 'application:module:bump', `this.module( require('../workflow/modules/bump.js') )`)
  chunkAdd('Wkfile:bump', `wk.require('bump', true)`)
})

after('bundle', function() {
  template('Wkfile')
  template('config/application.js')
})