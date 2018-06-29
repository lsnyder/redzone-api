var express = require('express');
var router = express.Router();
var player_controller = require('../controllers/player');
const { check, validationResult } = require('express-validator/check');


/* GET users listing. */
router.get('/', [
  check('teamId').optional().isInt(),
  check('position').optional().equals('WR')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  player_controller.player_list(req, res)
});

router.get('/:id', player_controller.player_detail);

module.exports = router;
