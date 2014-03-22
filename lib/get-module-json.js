var join = require('path').join
var exists = require('fs').existsSync

module.exports = function(root) {
  var path = join(root, 'module.json')
  return exists(path) ? require(path) : {}
}
