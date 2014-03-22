var run = require('tape')
var toSemver = require('../lib/version-to-semver')

run('version-to-semver', function(test) {
  var input = [2, 96, '132', 5334, 'h4ck']
  var output = ['0.0.2', '0.9.6', '1.3.2', null, null]
  var message = [
    'handles 1 digit',
    'handles 2 digits',
    'handles 3 digits',
    'returns null if > 3 digits',
    'returns null if NaN'
  ]

  test.plan(input.length)

  input.forEach(function(version, i) {
    test.equal(toSemver(version), output[i], message[i])
  })
})
