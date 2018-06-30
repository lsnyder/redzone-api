const mongo = require('mongodb')

exports.upsert = (req, statType, cb) => {
  mongo.connect('mongodb+srv://lsnyder:F51xtOAJYvqin5@free-dev-01-gwb63.mongodb.net/teams?retryWrites=true', function(err, client) {
    if (err) throw err;
    var db = client.db('stats')
    var bulk = db.collection('stat').initializeUnorderedBulkOp();
    switch(statType) {
      case 'team':
        statInfoList = req.body.teamStatInfoList;
      case 'defense':
        statInfoList = req.body.playerDefensiveStatInfoList;
      case 'rushing':
        statInfoList = req.body.playerRushingStatInfoList;
      case 'passing':
        statInfoList = req.body.playerPassingStatInfoList;
      case 'receiving':
        statInfoList = req.body.playerReceivingStatInfoList;
      case 'kicking':
        statInfoList = req.body.playerKickingStatInfoList;
      case 'punting':
        statInfoList = req.body.playerPuntingStatInfoList;
    }
    const typeMap = {
      team: 'teamStatInfoList',
      defense: 'playerDefensiveStatInfoList',
      rushing: 'playerRushingStatInfoList',
      passing: 'playerPassingStatInfoList',
      receiving: 'playerReceivingStatInfoList',
      kicking: 'playerKickingStatInfoList',
      punting: 'playerPuntingStatInfoList'
    }
    const statInfoList = req.body[typeMap[statType]]
    statInfoList.forEach(stat => {
      stat.type = statType;
      bulk.find({statId:stat.statId, type:stat.type}).upsert().updateOne(stat)
    })
    bulk.execute();
    cb()
  })
}
