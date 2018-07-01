var express = require('express');
var router = express.Router();
var score_controller = require('../controllers/score');
var expressJoi = require('express-joi-validator');
var Joi = require('joi');

//Get scores by year
router.get('/year/:year', expressJoi({
  query: {
    week: Joi.number(),
    year: Joi.number().required()
  }
}), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  score_controller.score_weekly(req, res)
});


module.exports = router;
