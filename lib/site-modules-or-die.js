var join = require('path').join
var exists = require('fs').existsSync

module.exports = function(root) {
  var classic = join(root, 'site/modules')
  var composer = join(root, 'vendor/processwire/processwire/site/modules')

  if (exists(classic)) return classic
  if (exists(composer)) return composer

  console.error(
    'Unable to find the '.grey + 'site/modules'.yellow +
    ' directory.\nTry re-running this command from the '.grey +
    'project root.'.grey
  )

  process.exit(1)
}
