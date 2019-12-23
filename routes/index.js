var express = require('express');
var router = express.Router();
var team_controller = require('../controllers/team')
var standing_controller = require('../controllers/standing')
var player_controller = require('../controllers/player')
var stat_controller = require('../controllers/stat')
var score_controller = require('../controllers/score')

router.get('/', (req, res) => {
  res.render('index', { title: 'upp-api API' });
})

router.post('/:platform/:leagueId/leagueteams', (req, res) => {
  team_controller.upsert_team_detail(req, res)
})

router.post('/:platform/:leagueId/standings', (req, res) => {
  standing_controller.upsert_standings(req, res)
})

router.post('/:platform/:leagueId/week/:weekType/:weekNumber/schedules', (req, res) => {
  score_controller.upsert_scores(req, res)
})

router.post('/:platform/:leagueId/week/:weekType/:weekNumber/teamstats', (req, res) => {
  stat_controller.upsert_team_stats(req, res)
})

router.post('/:platform/:leagueId/week/:weekType/:weekNumber/defense', (req, res) => {
  stat_controller.upsert_defensive_stats(req, res)
})

router.post('/:platform/:leagueId/week/:weekType/:weekNumber/kicking', (req, res) => {
  stat_controller.upsert_kicking_stats(req, res)
})

router.post('/:platform/:leagueId/week/:weekType/:weekNumber/passing', (req, res) => {
  stat_controller.upsert_passing_stats(req, res)
})

router.post('/:platform/:leagueId/week/:weekType/:weekNumber/punting', (req, res) => {
  stat_controller.upsert_punting_stats(req, res)
})

router.post('/:platform/:leagueId/week/:weekType/:weekNumber/rushing', (req, res) => {
  stat_controller.upsert_rushing_stats(req, res)
})

router.post('/:platform/:leagueId/week/:weekType/:weekNumber/receiving', (req, res) => {
  stat_controller.upsert_receiving_stats(req, res)
})

router.post('/:platform/:leagueId/freeagents/roster', (req, res) => {
  player_controller.upsert_players(req, res)
})

router.post('/:platform/:leagueId/team/:teamId/roster', (req, res) => {
  player_controller.upsert_players(req, res)
})


module.exports = router;
