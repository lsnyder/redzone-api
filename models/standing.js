const db = require('../services/mongo')

exports.upsert = (req, cb) => {
  const {teamStandingInfoList} = req.body;
  const bulk = db.get()
    .db('teams')
    .collection('standings')
    .initializeUnorderedBulkOp();

  teamStandingInfoList.forEach(team => {
    bulk.find({teamId:team.teamId}).upsert().updateOne(team)
  })
  bulk.execute();
  cb()
}
