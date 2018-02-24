---
apis:
  - file
  - boilerplate
---
store('root').set('use_environment', true)

addFile('module_environment.js', { rename: 'workflow/modules/environment.js' })

chunk().add('application:module:environment', "  this.module( require('../workflow/modules/environment.js') )")

stack().before('bundle', 'environment:configs', function() {
  if (!store('root').get('use_rails')) {
    addFile('environments/**/*', { base_dir: 'config' })
  }
})