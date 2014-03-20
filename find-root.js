var fs = require('fs')
var find = require('find-parent-dir')
var path = require('path')

module.exports = function() {
  var cwd = process.cwd()

  // Assume we are in the project root
  var root = cwd
  var siteModules = path.join(root, 'site/modules')

  // If we aren’t, try to find the actual root
  if (!fs.existsSync(siteModules)) {
    root = (
      find.sync(cwd, 'module.json') ||
      find.sync(cwd, 'index.php') ||
      find.sync(cwd, '.git') ||
      cwd
    )
  }

  return root
}
