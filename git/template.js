//api('file')
//api('stack')
//api('exec')
//api('template')

stack().before('bundle', function() {
  chunkAdd('application:module:git', "this.module( require('../workflow/modules/git.js') )")
})

invocator().after('bundle', 'git:init', function() {
  execSync('git init')
})