var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/:platform/:leagueId/standings', (req, res) => {
  standing_controller.upsert_standings(req, res)
})

module.exports = router;
