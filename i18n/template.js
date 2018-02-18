/* eslint-disable */
//@api=file
//@api=boilerplate
//@api=exec

addFile('**/*')
ignoreFile('template.js')

chunk().add('application:module:i18n', "this.module( require('../workflow/modules/i18n.js') )")

chunk().add('application:setup:i18n', `
this.config('i18n').spreadSheetKey = '<spreadsheet_key>'
this.config('i18n').default_locale = 'en'
this.config('i18n').locales.push( 'en', 'fr' )
this.config('i18n').load_path.push(
  this.root + '/config/locales'
)`)

chunk().add('wkfile:require:i18n', "wk.require('i18n', true)")

chunk().add('wkfile:tasks', `
task('compile', [ 'application:run --copy', 'webpack --compile --debug' ])
task('watch'  , [ 'application:run --copy', 'webpack --watch --debug' ])
task('server' , [ 'application:run --copy', 'webpack --server' ])
task('deploy' , [ 'application:run --copy', 'aws:objects', 'aws:exception' ])

namespace('build', function() {

  task('default', [ 'application:run --copy', 'webpack --compress' ])

  task('locales', [ 'application:run' ], { async: true },  function() {
    const Application = require( './workflow/index.js' )
    const commands    = Application.config('i18n').locales.map(function(locale) {
      return "I18N_LOCALE=" + locale + " npm run build"
    })

    wk.exec(commands)
    .catch(this.fail)
    .then(this.complete)
  })

})`)

editFile('package.json', function(c) {
  const content = JSON.parse(c)

  content.dependencies["google-spreadsheet"] = "2.0.4"

  content.scripts["locales"] = "wk i18n"
  content.scripts["build:locales"] = "wk build:locales"

  return JSON.stringify(content, null, 2)
})