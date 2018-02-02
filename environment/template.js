template('config/application.js')

stack().before('bundle', function() {
  chunkAdd('application:module:environments', "this.module( require('../workflow/modules/environment.js') )")
})