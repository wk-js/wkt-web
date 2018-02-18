/* eslint-disable */
//@api=file

addFile('**/*')
ignoreFile('template.js')

chunk().add('application:module:package', "this.module( require('../workflow/modules/package.js') )")

chunk().add('wkfile:require:bump', "wk.require('bump', true)")