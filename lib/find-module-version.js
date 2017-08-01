var read = require('fs').createReadStream

var uncomment = function(string) {
  // http://ostermiller.org/findcomment.html
  // added |(?:#.*) to perl solution 
  return string
    .replace(/(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*)|(?:#.*)/g, '')
}

module.exports = function(module, callback) {
  var version = null
  read(module)
    .on('error', callback)
    .on('data', function(buffer) {
    if (version) {
      return
    }

    var result = uncomment(buffer.toString()).match(
      /('|")version('|")\s+?=>\s+?('|")?([0-9\.]+)/
    )

    if (result) { 
      version = result[4] || null
    }

    if (version) {
      version = version.replace(/\./g, '')
    }

    callback(null, version)
  })
}
