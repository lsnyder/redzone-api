const mongo = require('mongodb')

exports.listWeeklyScores = (req, cb) => {
  const {year} = req.params
  const {week} = req.query
  mongo.connect('mongodb+srv://lsnyder:F51xtOAJYvqin5@free-dev-01-gwb63.mongodb.net/teams?retryWrites=true', function(err, client) {
    if (err) throw err;
    var db = client.db('teams')
    var scores = db.collection('scores');
    var query = {seasonIndex: parseInt(year)}
    if (week) { query.weekIndex = parseInt(week) }
    scores.find(query).toArray((err, docs) => {
      if (err || !docs) throw err;
      cb(docs)
    })
  })
}

exports.upsert = (req, cb) => {
  const {gameScheduleInfoList} = req.body;
  mongo.connect('mongodb+srv://lsnyder:F51xtOAJYvqin5@free-dev-01-gwb63.mongodb.net/teams?retryWrites=true', function(err, client) {
    if (err) throw err;
    var db = client.db('teams')
    var bulk = db.collection('scores').initializeUnorderedBulkOp();

    gameScheduleInfoList.forEach(game => {
      bulk.find({scheduleId:game.scheduleId}).upsert().updateOne(game)
    })
    bulk.execute();
    cb()
  })
}
