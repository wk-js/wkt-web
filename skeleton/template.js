//api('file')
//api('prompt')
//api('stack')
//api('template')

template('config/application.js')
template('Wkfile')
template('README.md')

before('prompt', function() {
  prompt('Project name:', 'project_name')
})

after('bundle', function() {
  templateData({
    project_name: answer('project_name')
  })
})
