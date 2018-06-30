const mongo = require('mongodb')

exports.upsert = (req, statType, cb) => {
  switch(statType) {
    case 'team':
      const statInfoList = req.body.teamStatInfoList;
    case 'defense':
      const statInfoList = req.body.playerDefensiveStatInfoList;
    case 'rushing':
      const statInfoList = req.body.playerRushingStatInfoList;
    case 'passing':
      const statInfoList = req.body.playerPassingStatInfoList;
    case 'receiving':
      const statInfoList = req.body.playerReceivingStatInfoList;
    case 'kicking':
      const statInfoList = req.body.playerKickingStatInfoList;
    case 'punting':
      const statInfoList = req.body.playerPuntingStatInfoList;
  }
  mongo.connect('mongodb+srv://lsnyder:F51xtOAJYvqin5@free-dev-01-gwb63.mongodb.net/teams?retryWrites=true', function(err, client) {
    if (err) throw err;
    var db = client.db('stats')
    var bulk = db.collection('stat').initializeUnorderedBulkOp();

    statInfoList.forEach(stat => {
      stat.type = statType;
      bulk.find({statId:stat.statId, type:stat.type}).upsert().updateOne(stat)
    })
    bulk.execute();
    cb()
  })
}
