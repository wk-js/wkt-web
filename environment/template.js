/* eslint-disable */
//@api=file

addFile('**/*')
ignoreFile('template.js')

chunk().add('application:module:environment', "this.module( require('../workflow/modules/environment.js') )")

chunk().add('application:setup:assets', '')