const db = require('../services/mongo')

exports.upsert = (req, cb) => {
  const {leagueTeamInfoList} = req.body;
  const bulk = db.get()
    .db('teams')
    .collection('teams')
    .initializeUnorderedBulkOp();

  leagueTeamInfoList.forEach(team => {
    bulk.find({teamId:team.teamId}).upsert().updateOne(team)
  })
  bulk.execute();
  cb()
}
