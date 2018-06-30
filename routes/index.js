var express = require('express');
var router = express.Router();
var team_controller = require('../controllers/team')
var standing_controller = require('../controllers/standing')

router.post('/:platform/:leagueId/leagueteams', (req, res) => {
  team_controller.upsert_team_detail(req, res)
})

router.post('/:platform/:leagueId/standings', (req, res) => {
  standing_controller.upsert_standing(req, res)
})

module.exports = router;
