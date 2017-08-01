var nedb = require('nedb')
var mkdir = require('fs').mkdirSync
var join = require('path').join
var home = require('home-dir')()
var semver = require('semver')
var Fuse = require('fuse.js')

var directory = join(home, '.pwm')
var file = join(directory, 'modules')

try { mkdir(directory) }
catch (e) { }

var db = new nedb({
  filename: file,
  autoload: true
})

db.ensureIndex({
  fieldName: 'id',
  unique: true
})

module.exports = {
  find: function(module, callback) {
    var parts = module.split('@')
    var name = parts[0]
    var version = parts[1]

    var query = {
      class_name: name
    }

    if (version) {
      query.$where = function() {
        return semver.satisfies(this.module_version, version)
      }
    }

    db.findOne(query)
      .exec(function(error, info) {
        if (error) {
          callback(error)
          return
        }

        if (!info) {
          return callback(new Error(
            'Could not find ' + name + (version ? '@' + version : '')
          ))
        }

        callback(null, info, version || info.module_version, !!version)
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
  },
  insert: function(data, callback) {
    db.insert(data, function(error) {
      callback(error)
    })
  }
}
