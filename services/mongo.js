const config = require('../config');
var MongoClient = require('mongodb').MongoClient
const {host, username, password} = config.db;
const state = { db: null }

exports.get = function() {
  return state.db
}

exports.connect = (done) => {
  if (state.db) return done()
  MongoClient.connect(`mongodb+srv://${username}:${password}@${host}`, {retryWrites:true}, (err, db) => {
    if (err) return done(err)
    state.db = db;
    done()
  })
}