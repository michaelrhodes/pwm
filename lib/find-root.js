var fs = require('fs')
var find = require('find-parent-dir')
var path = require('path')

module.exports = function() {
  var cwd = process.cwd()

  // Assume we are in the project root
  var root = cwd

  // If we aren’t, try to find the actual root
  if (!fs.existsSync(path.join(root, 'site/modules'))) {
    root = (
      find.sync(cwd, 'module.json') ||
      find.sync(cwd, 'index.php') ||
      find.sync(cwd, '.git') ||
      cwd
    )
  }

  return root
}
