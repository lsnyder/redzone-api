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

exports.show_detail = (req, cb) => {
  const {teamId} = req.params;
  const teams = db.get().db('teams').collection('teams')
  var query = {teamId}
  
  teams.find(query).toArray((err, docs) => {
    if (err || !docs) throw err;
    cb(docs)
  })
}

exports.list = (req, cb) => {
  const teams = db.get().db('teams').collection('teams')
  teams.find().toArray((err, docs) => {
    if (err || !docs) throw err;
    cb(docs)
  })
}

exports.list_players = (req, cb) => {
  const {teamId} = req.params;
  const players = db.get().db('teams').collection('players')
  var query = {teamId}
  console.log(query)

  players.find(query).toArray((err, docs) => {
    if (err || !docs) throw err;
    cb(docs)
  })
}

