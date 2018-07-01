const db = require('../services/mongo')

exports.listWeeklyScores = (req, cb) => {
  const {year} = req.params
  const {week} = req.query
  const scores = db.get().db('teams').collection('scores');
  var query = {seasonIndex: parseInt(year)}

  if (week) { query.weekIndex = parseInt(week) }

  scores.find(query).toArray((err, docs) => {
    if (err || !docs) throw err;
    cb(docs)
  })
}

exports.upsert = (req, cb) => {
  const {gameScheduleInfoList} = req.body;
  const bulk = db.get()
    .db('teams')
    .collection('scores')
    .initializeUnorderedBulkOp();

  gameScheduleInfoList.forEach(game => {
    bulk.find({scheduleId:game.scheduleId}).upsert().updateOne(game)
  })
  bulk.execute();
  cb()
}
