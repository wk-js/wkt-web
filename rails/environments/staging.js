'use strict'

module.exports = function Staging() {

  this.entry('styles/index.styl'      , 'stylesheets/main.css.erb')
  this.entry('scripts/index.js'       , 'javascripts/main.js')
  this.entry('scripts/vendor/index.js', 'javascripts/vendor.js')

}