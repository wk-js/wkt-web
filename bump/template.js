//api('file')
//api('stack')
//api('template')

template('Wkfile')
template('config/application.js')

stack().before('bundle', function() {
  chunkBefore('application:module', 'application:module:bump', "this.module( require('../workflow/modules/bump.js') )")
  chunkAdd('Wkfile:bump', "wk.require('bump', true)")
})