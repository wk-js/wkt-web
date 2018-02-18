/* eslint-disable */
//@api=file
//@api=boilerplate
//@api=exec

addFile('**/*')
ignoreFile('template.js')
addFile('.gitignore')

chunk().add('application:module:git', "this.module( require('../workflow/modules/git.js') )")

RootStack().after('bundle', 'git:init', function() {
  return exec('git init')
})