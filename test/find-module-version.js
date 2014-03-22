var run = require('tape')
var findModuleVersion = require('../lib/find-module-version')

run('find-module-version', function(test) {
  var input = [
    __dirname + '/fixtures/HelloWorld.module',
    __dirname + '/fixtures/HelloWorld-commented.module'
  ]
  var output = ['101', null]
  var message = [
    'it works',
    'ignores commented out code'
  ]

  test.plan(input.length)

  input.forEach(function(module, i) {
    findModuleVersion(module, function(error, version) {
      if (error) {
        test.fail(error.message)
        return
      }
      test.equal(version, output[i], message[i]) 
    })
  })
})
