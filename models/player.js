const db = require('../services/mongo')

exports.find = (id, cb) => {
  const players = db.get().db('teams').collection('players')

  players.findOne({rosterId:parseInt(id)}, (err, doc) => {
    if (err || !doc) throw err;
    cb(doc)
  })
}

exports.list = (req, cb) => {
  const {teamId, position} = req.query
  const players = db.get().db('teams').collection('players')
  var query = {}

  if (teamId) { query.teamId = parseInt(teamId) }
  if (position) { query.position = position }
  players.find(query).toArray((err, docs) => {
    if (err || !docs) throw err;
    cb(docs)
  })
}

exports.find_stats = (req, cb) => {
  const {seasonIndex, weekIndex} = req.query
  const {id} = req.params
  const stats = db.get().db('stats').collection('stat')
  var query = {rosterId:id}

  if (seasonIndex) { query.seasonIndex = seasonIndex }
  if (weekIndex) { query.weekIndex = weekIndex }
  console.log(query)
  stats.find(query).toArray((err, docs) => {
    if (err || !docs) throw err;
    cb(docs)
  })
}

exports.upsert = (req, cb) => {
  const {rosterInfoList} = req.body;
  const bulk = db.get()
    .db('teams')
    .collection('players')  
    .initializeUnorderedBulkOp();

  rosterInfoList.forEach(player => {
    bulk.find({rosterId:player.rosterId}).upsert().updateOne(player)
  })
  bulk.execute();
  cb()
}