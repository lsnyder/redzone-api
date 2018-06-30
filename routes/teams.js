var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Redzone API' });
});

router.post('/:platform/:leagueId/leagueteams', (req, res) => {
  team_controller.upsert_team_detail(req, res)
})

module.exports = router;
