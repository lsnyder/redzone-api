var Team = require('../models/team')
//Upsert team details
exports.upsert_team_detail = function(req, res) {
  Team.upsert(req, () => {
    res.sendStatus(202)
  })
};

exports.team_detail = function(req, res) {
  Team.show_detail(req, (detail) => {
    res.send(detail)
  })
};

exports.list_teams = function(req, res) {
  Team.list(req, (teams) => {
    res.send(teams)
  })
};

exports.list_players = function(req, res) {
  Team.list_players(req, (players) => {
    res.send(players)
  })
};