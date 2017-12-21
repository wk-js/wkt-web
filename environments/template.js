//api('file')
//api('template')

template('config/application.js')

before('bundle', function() {
  chunksAdd('application:module:environments', `this.module( require('../workflow/modules/environment.js') )`)
})