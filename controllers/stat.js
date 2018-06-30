var Stat = require('../models/stat')
//Upsert stat details
exports.upsert_defensive_stats = function(req, res) {
  Stat.upsert(req, 'defense',() => {
    res.sendStatus(202)
  })
};

exports.upsert_team_stats = function(req, res) {
  Stat.upsert(req, 'team',() => {
    res.sendStatus(202)
  })
};

exports.upsert_rushing_stats = function(req, res) {
  Stat.upsert(req, 'rushing',() => {
    res.sendStatus(202)
  })
};

exports.upsert_receiving_stats = function(req, res) {
  Stat.upsert(req, 'receiving',() => {
    res.sendStatus(202)
  })
};

exports.upsert_kicking_stats = function(req, res) {
  Stat.upsert(req, 'kicking',() => {
    res.sendStatus(202)
  })
};

exports.upsert_passing_stats = function(req, res) {
  Stat.upsert(req, 'passing',() => {
    res.sendStatus(202)
  })
};

exports.upsert_punting_stats = function(req, res) {
  Stat.upsert(req, 'punting',() => {
    res.sendStatus(202)
  })
};