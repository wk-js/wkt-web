'use strict'

const when = require('when')
const { spawn } = require('child_process')

module.exports = function(Application) {

  this.configure.after('application:initialize', 'git:commit:last', function() {
    return when.promise((resolve) => {
      const ps = spawn('bash', [ '-c', 'git rev-parse --verify HEAD' ])

      ps.stdout.on('data', (d) => {
        Application.config.git = {
          commit: d.toString('utf-8').replace(/^\s|\s$/g, '')
        }
      })

      ps.on('exit', resolve)
    })
  })

}