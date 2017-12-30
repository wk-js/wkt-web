'use strict'

const Configure = require('./stack/configure')

class Application {

  constructor() {
    this.config = {}

    // Setup
    this.configure = new Configure(this)
    this.configure.add( 'application:initialize' )
    this.configure.add( 'application:configure'  )
  }

  get root() {
    return process.cwd()
  }

  module(fn) {
    fn.call( this, this )
  }

  make() {
    return this.configure.execute( this )
  }

}

Application.create = function() {
  return new Application
}

module.exports = Application