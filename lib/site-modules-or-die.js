var join = require('path').join
var exists = require('fs').existsSync

module.exports = function(root) {
  var path = join(root, 'site/modules')

  if (exists(path)) {
    return path
  }

  console.error(
    'Unable to find the '.grey + 'site/modules'.yellow +
    ' directory.\nTry re-running this command from the '.grey +
    'project root.'.grey
  )

  process.exit(1)
}
