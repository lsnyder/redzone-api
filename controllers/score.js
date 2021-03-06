var Score = require('../models/score')
// Display list of all players.
exports.score_weekly = function(req, res) {
  Score.listWeeklyScores(req, (scores) => {
    res.send(scores)
  })
};

exports.upsert_scores = function(req, res) {
  Score.upsert(req, () => {
    res.sendStatus(202)
  })
};