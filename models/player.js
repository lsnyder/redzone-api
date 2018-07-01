const mongo = require('mongodb')

exports.find = (id, cb) => {
  mongo.connect('mongodb+srv://lsnyder:F51xtOAJYvqin5@free-dev-01-gwb63.mongodb.net/teams?retryWrites=true', function(err, client) {
    if (err) throw err;
    var db = client.db('teams')
    var players = db.collection('players');
    players.findOne({rosterId:parseInt(id)}, (err, doc) => {
      if (err || !doc) throw err;
      cb(doc)
    })
  })
}

exports.list = (req, cb) => {
  const {teamId, position} = req.query
  mongo.connect('mongodb+srv://lsnyder:F51xtOAJYvqin5@free-dev-01-gwb63.mongodb.net/teams?retryWrites=true', function(err, client) {
    if (err) throw err;
    var db = client.db('teams')
    var players = db.collection('players');
    var query = {}
    if (teamId) { query.teamId = parseInt(teamId) }
    if (position) { query.position = position }
    console.log(query)
    players.find(query).toArray((err, docs) => {
      if (err || !docs) throw err;
      cb(docs)
    })
  })
}

exports.upsert = (req, cb) => {
  const {rosterInfoList} = req.body;
  mongo.connect('mongodb+srv://lsnyder:F51xtOAJYvqin5@free-dev-01-gwb63.mongodb.net/teams?retryWrites=true', function(err, client) {
    if (err) throw err;
    var db = client.db('teams')
    var bulk = db.collection('players').initializeUnorderedBulkOp();

    rosterInfoList.forEach(player => {
      bulk.find({rosterId:player.rosterId}).upsert().updateOne(player)
    })
    bulk.execute();
    cb()
  })
}