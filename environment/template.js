---
apis:
  - file
  - boilerplate
---
store('root', 'use_environment', true)

addFile('environments/**/*', { base_dir: 'config' })
addFile('module_environment.js', { rename: 'workflow/modules/environment.js' })

chunk().add('application:module:environment', "  this.module( require('../workflow/modules/environment.js') )")

chunk().add('application:setup:assets', '')