'use strict'

module.exports = function Application() {

  this.configure.add('application:initialize', () => {
{%= chunk('application:setup') %}
  })

  this.module( require('../workflow/modules/assets.js') )
  this.module( require('../workflow/modules/ejs.js') )
  this.module( require('../workflow/modules/webpack.js') )
{%= chunk('application:module') %}

}