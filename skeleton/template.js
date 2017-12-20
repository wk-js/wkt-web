//api('file')
//api('prompt')
//api('stack')
//api('template')

before('prompt', function() {
  prompt('Project name:', 'project_name')
})


after('bundle', function() {
  const options = {
    data: {
      project_name: answer('project_name')
    }
  }

  template('config/application.js', options)
  template('Wkfile', options)
  template('README.md', options)
})
