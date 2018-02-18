/* eslint-disable */
//@api=file

addFile('**/*')
ignoreFile('template.js')

chunk().add('wkfile:require:aws', "wk.require('aws', true)")
chunk().add('application:module:aws', "this.module( require('../workflow/modules/aws.js') )")