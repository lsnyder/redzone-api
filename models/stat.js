const db = require('../services/mongo')

exports.upsert = (req, statType, cb) => {
  const bulk = db.get()
    .db('stats')
    .collection('stat')
    .initializeUnorderedBulkOp();
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
    if (teamId === 764411929) {
      console.log(stat.rosterId, state.teamId)
      db.get().db('stats').collection('stat').find({
        $or:[
          {rosterId:stat.rosterId},
          {teamId:stat.teamId}
        ], 
        seasonIndex:stat.seasonIndex, 
        weekIndex:{$lte:stat.weekIndex}
      }).toArray((err, docs) => {
        console.log("------", docs)
      })
    }
    bulk.find({statId:stat.statId, type:stat.type}).upsert().updateOne(stat)
  })
  bulk.execute();
  cb()
}
