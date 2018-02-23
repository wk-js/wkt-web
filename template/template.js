---
apis:
  - file
---
addFile('task_template.js', { rename: 'workflow/tasks/template.js' })
addFile('templates/**/*', { base_dir: 'workflow' })

chunk().add('wkfile:require:template', "wk.require('template', true)")