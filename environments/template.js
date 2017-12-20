//api('file')
//api('template')

before('bundle', function() {
  chunksAdd('application:module:environments', `this.module( require('../workflow/modules/environment.js') )`)
})

after('bundle', function() {
  template('config/application.js')
})