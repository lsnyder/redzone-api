var Standing = require('../models/standing')
//Upsert standigs
exports.upsert_standings = function(req, res) {
  Standing.upsert(req, () => {
    res.sendStatus(202)
  })
};