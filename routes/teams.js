var express = require('express');
var router = express.Router();
var team_controller = require('../controllers/team')
var expressJoi = require('express-joi-validator');
var Joi = require('joi');

/* GET home page. */
router.get('/', team_controller.list_teams);

router.get('/:teamId', expressJoi({
  params: {
    teamId: Joi.number()
  }
}), team_controller.team_detail);

router.get('/:teamId/players', expressJoi({
  params: {
    teamId: Joi.number()
  }
}), team_controller.list_players);

module.exports = router;
