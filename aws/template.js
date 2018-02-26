---
apis:
  - file
---
addFile('module_aws.js', { rename: 'workflow/modules/aws.js' })
addFile('task_aws.js', { rename: 'workflow/tasks/aws.js' })

chunk().add('wkfile:require:aws', "wk.require('aws', true)")
chunk().add('application:module:aws', "  this.module( require('../workflow/modules/aws.js') )")

chunk().add('wkfile:tasks:aws', `task('deploy' , [ 'application:run --copy', 'aws:objects', 'aws:exception' ])`)