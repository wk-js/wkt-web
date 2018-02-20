---
apis:
  - file
---
addFile('**/*')
ignoreFile('template.js')

chunk().add('wkfile:require:template', "wk.require('template', true)")