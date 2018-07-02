var express = require('express');
var router = express.Router();
var player_controller = require('../controllers/player');
var expressJoi = require('express-joi-validator');
var Joi = require('joi');

/* GET users listing. */
router.get('/', expressJoi({
  query: {
    teamId: Joi.number(),
    position: Joi.string()
  }
}), (req, res) => {
  player_controller.player_list(req, res)
});

router.get('/:id', player_controller.player_detail);

router.get('/:id/stats',expressJoi({
  params: {
    id: Joi.number()
  },
  query: {
    seasonIndex: Joi.number(),
    weekIndex: Joi.number()
  }
}), (req, res) => {
  player_controller.player_stats(req, res)
})

module.exports = router;
