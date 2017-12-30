template('config/application.js')

stack().before('bundle', function() {
  chunksAdd('application:module:environments', "this.module( require('../workflow/modules/environment.js') )")
})