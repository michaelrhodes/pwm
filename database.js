var nedb = require('nedb')
var mkdir = require('fs').mkdirSync
var join = require('path').join
var home = require('home-dir')()

var directory = join(home, '.pwm')
var file = join(directory, 'modules')

try { mkdir(directory) }
catch (e) { }

var db = new nedb({
  filename: file,
  autoload: true
})

/*
var request = require('hyperdirect').request
var parse = require('JSONStream').parse

request('http://modules.processwire.com/export-json?apikey=pw223&limit=100')
  .pipe(parse('items'))
  .on('data', function(json) {
    db.insert(json, function(error, inserted) {
      console.log(inserted.length)
    })
  })
*/

module.exports = {
  find: function(module, callback) {
    db.findOne({ class_name: module })
      .exec(function(error, info) {
        if (error) {
          callback(error)
          return
        }

        if (!info) {
          return callback(new Error(
            'Could not find ' + module
          ))
        }

        callback(null, info)
      }) 
  }
}
