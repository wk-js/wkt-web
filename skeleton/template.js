template('config/application.js')
template('Wkfile')
template('README.md')

stack().before('prompt', function() {
  prompt('Project name:', 'project_name')
})

stack().after('prompt', function() {
  output(output() + '/' + answer('project_name'))
})

stack().after('bundle', function() {
  templateData({
    project_name: answer('project_name')
  })
})
