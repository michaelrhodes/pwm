var valid = require('semver').valid

module.exports = function(version) {
  version = version.toString()

  var semver = version.split('')
  if (semver.length > 3) {
    return null
  }

  if (semver.length === 3) {
    semver = semver.join('.')
  }

  if (!valid(semver)) {
    semver = version.split('')
    semver = (
      new Array(4 - semver.length).join('0.') +
      semver.join('.')
    )
    return valid(semver) ? semver : null
  }

  return semver
}
