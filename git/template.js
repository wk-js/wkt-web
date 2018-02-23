---
apis:
  - file
  - boilerplate
  - exec
---
addFile('module_git.js', { rename: 'workflow/modules/git.js' })
addFile('.gitignore')

chunk().add('application:module:git', "  this.module( require('../workflow/modules/git.js') )")

stack('root').after('bundle', 'git:init', function() {
  return exec('git init')
})