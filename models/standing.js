const mongo = require('mongodb')

exports.upsert = (req, cb) => {
  const {teamStandingInfoList} = req.body;
  mongo.connect('mongodb+srv://lsnyder:F51xtOAJYvqin5@free-dev-01-gwb63.mongodb.net/teams?retryWrites=true', function(err, client) {
    if (err) throw err;
    var db = client.db('teams')
    var bulk = db.collection('standings').initializeUnorderedBulkOp();

    teamStandingInfoList.forEach(team => {
      bulk.find({teamId:team.teamId}).upsert().updateOne(team)
    })
    bulk.execute();
    cb()
  })
}
