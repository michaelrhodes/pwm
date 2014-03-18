var nedb = require('nedb')
var mkdir = require('fs').mkdirSync
var join = require('path').join
var home = require('home-dir')()
var Fuse = require('fuse.js')

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
  },
  search: function(query, callback) {
    db.find({})
      .exec(function(error, modules) {
        if (error) {
          callback(error)
          return
        }
     
        var fuse = new Fuse(modules, {
          keys: ['title', 'class_name', 'summary'],
          threshold: 0.2
        })
       
        callback(null, fuse.search(query)) 
      })
  }
}
