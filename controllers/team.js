var Team = require('../models/team')
//Upsert team details
exports.upsert_team_detail = function(req, res) {
  Team.upsert(req, () => {
    res.sendStatus(202)
  })
};