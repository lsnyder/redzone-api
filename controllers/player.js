var Player = require('../models/player')
// Display list of all players.
exports.player_list = function(req, res) {
  Player.list(req, (players) => {
    res.send(players)
  })
};

// Display detail page for a specific player.
exports.player_detail = function(req, res) {
  const {id} = req.params
  Player.find(id, (player) => {
    res.send(player)
  })
};


exports.upsert_players = function(req, res) {
  console.log("$$$$")
  Player.upsert(req, () => {
    res.send(202)
  })
};