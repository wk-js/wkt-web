'use strict'

const path = require('path')

module.exports = function(Application) {

  this.configure.before('application:configure', 'environment:setup', function() {
    const ENV           = process.env.NODE_ENV || 'development'
    const ENV_DATA_PATH = path.join(process.cwd(), 'config/environments/', ENV)
    const ENV_DATA      = require(ENV_DATA_PATH)

    Application.config.environment = {
      env: ENV
    }

    ENV_DATA.call( Application, Application )
  })

}