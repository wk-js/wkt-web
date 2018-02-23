---
apis:
  - file
---
addFile('module_package.js', { rename: 'workflow/modules/package.js' })
addFile('task_bump.js', { rename: 'workflow/tasks/bump.js' })

chunk().add('application:module:package', "  this.module( require('../workflow/modules/package.js') )")

chunk().add('wkfile:require:bump', "wk.require('bump', true)")