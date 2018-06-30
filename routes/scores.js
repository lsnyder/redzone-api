var express = require('express');
var router = express.Router();
var score_controller = require('../controllers/score');
const { check, validationResult } = require('express-validator/check');


//Get scores by year
router.get('/year/:year', [
  check('year').isInt(),
  check('week').optional().isInt()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  score_controller.score_weekly(req, res)
});


module.exports = router;
