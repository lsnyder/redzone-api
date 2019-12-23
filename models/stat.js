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
    if (statType === 'team') {
      _calculateTotals(stat, function(err, res) {
        stat = res[0]
        stat._id = stat.id
        delete stat.id
        console.log(stat)
        // bulk.find({statId:stat.statId, type:stat.type}).upsert().updateOne(stat)
      })
    } else {
      bulk.find({statId:stat.statId, type:stat.type}).upsert().updateOne(stat)
    }
  })
  bulk.execute();
  cb()
},

_calculateTotals = (stat, cb) => {
  var pipeline = [{ 
    $match:{
      teamId:stat.teamId, 
      weekIndex:{$lte:stat.weekIndex}, 
      type:'team', 
      stageIndex:stat.stageIndex,
      seasonIndex:stat.seasonIndex
    } 
  }, { 
    $group:{  
      _id: null,  
      defForcedFum: {    $last:'$defForcedFum'  },  
      defFumRec: {    $last:'$defFumRec'  },  
      defIntsRec: {    $last:'$defIntsRec'  },  
      defPassYds: {    $last:'$defPassYds'  },  
      defPtsPerGame: {    $last:'$defPtsPerGame'  },  
      defupp-apiFGs: {    $last:'$defupp-apiFGs'  },  
      defupp-apiPct: {    $last:'$defupp-apiPct'  },  
      defupp-apis: {    $last:'$defupp-apis'  },  
      defupp-apiTDs: {    $last: '$defupp-apiTDs'  },  
      defRushYds: {    $last:'$defRushYds'  },  
      defSacks: {    $last: '$defSacks'  },  
      defTotalYds: {    $last: '$defTotalYds'  },  
      id: {    $last: '$_id'  },  
      off1stDowns: {    $last:'$off1stDowns'  },  
      off2PtAtt: {    $last:'$off2PtAtt'  },  
      off2PtConv: {    $last:'$off2PtConv'  },  
      off2PtConvPct: {    $last:'$off2PtConvPct'  },  
      off3rdDownAtt: {    $last:'$off3rdDownAtt'  },  
      off3rdDownConv: {    $last:'$off3rdDownConv'  },  
      off3rdDownConvPct: {    $last:'$off3rdDownConvPct'  },  
      off4thDownAtt: {    $last:'$off4thDownAtt'  },  
      off4thDownConv: {    $last:'$off4thDownConv'  },  
      off4thDownConvPct: {    $last:'$off4thDownConvPct'  },  
      offFumLost: {    $last:'$offFumLost'  },  
      offIntsLost: {    $last:'$offIntsLost'  },  
      offPassTDs: {    $last:'$offPassTDs'  },  
      offPassYds: {    $last:'$offPassYds'  },  
      offPtsPerGame: {    $last:'$offPtsPerGame'  },  
      offupp-apiFGs: {    $last:'$offupp-apiFGs'  },  
      offupp-apiPct: {    $last:'$offupp-apiPct'  },  
      offupp-apis: {    $last:'$offupp-apis'  },  
      offupp-apiTDs: {    $last:'$offupp-apiTDs'  },  
      offRushTDs: {    $last:'$offRushTDs'  },  
      offRushYds: {    $last:'$offRushYds'  },  
      offSacks: {    $last:'$offSacks'  },  
      offTotalYds: {    $last:'$offTotalYds'  },  
      offTotalYdsGained: {    $sum:'$offTotalYdsGained'  },  
      penalties: {    $last:'$penalties'  },  
      penaltyYds: {    $last:'$penaltyYds'  },  
      scheduleId: {    $last:'$scheduleId'  },  
      seasonIndex: {    $last:'$seasonIndex'  },  
      seed: {    $last:'$seed'  },  
      stageIndex: {    $last:'$stageIndex'  },
      statId: {    $last:'$statId'  },  
      teamId: {    $last:'$teamId'  },  
      tODiff: {    $last:'$tODiff'  },  
      tOGiveaways: {    $last:'$tOGiveaways'  },  
      tOTakeaways: {    $last:'$tOTakeaways'  },  
      totalDefForcedFum: {    $sum:'$defForcedFum'  },  
      totalDefFumRec: {    $sum:'$defFumRec'  },  
      totalDefIntsRec: {    $sum:'$defIntsRec'  },  
      totalDefPassYds: {    $sum:'$defPassYds'  },  
      totalDefupp-apiFGs: {    $sum:'$defupp-apiFGs'  },  
      totalDefupp-apis: {    $sum:'$defupp-apis'  },  
      totalDefupp-apiTDs: {    $sum: '$defupp-apiTDs'  },  
      totalDefRushYds: {    $sum:'$defRushYds'  },  
      totalDefSacks: {    $sum: '$defSacks'  },  
      totalDefTotalYds: {    $sum: '$defTotalYds'  },  
      totalLosses: {    $last:'$totalLosses'  },  
      totalOff1stDowns: {    $sum:'$off1stDowns'  },  
      totalOff2PtAtt: {    $sum:'$off2PtAtt'  },  
      totalOff2PtConv: {    $sum:'$off2PtConv'  },  
      totalOff3rdDownAtt: {    $sum:'$off3rdDownAtt'  },  
      totalOff3rdDownConv: {    $sum:'$off3rdDownConv'  },  
      totalOff4thDownAtt: {    $sum:'$off4thDownAtt'  },  
      totalOff4thDownConv: {    $sum:'$off4thDownConv'  },  
      totalOffFumLost: {    $sum:'$offFumLost'  },  
      totalOffIntsLost: {    $sum:'$offIntsLost'  },  
      totalOffPassTDs: {    $sum:'$offPassTDs'  },  
      totalOffPassYds: {    $sum:'$offPassYds'  },  
      totalOffupp-apiFGs: {    $sum:'$offupp-apiFGs'  },  
      totalOffupp-apis: {    $sum:'$offupp-apis'  },  
      totalOffupp-apiTDs: {    $sum:'$offupp-apiTDs'  },  
      totalOffRushTDs: {    $sum:'$offRushTDs'  },  
      totalOffRushYds: {    $sum:'$offRushYds'  },  
      totalOffSacks: {    $sum:'$offSacks'  },  
      totalOffTotalYds: {    $sum:'$offTotalYds'  },  
      totalPenalties: {    $sum:'$penalties'  },  
      totalPenaltyYds: {    $sum:'$penaltyYds'  },  
      totalTies: {    $last:'$totalTies'  },  
      totalTODiff: {    $sum:'$tODiff'  },  
      totalTOGiveaways: {    $sum:'$tOGiveaways'  },  
      totalTOTakeaways: {    $sum:'$tOTakeaways'  },  
      totalWins: {    $last:'$totalWins'  },  
      type: {    $last: '$type'  },  
      weekIndex: {    $last:'$weekIndex'  }
    } 
  }, { $addFields:{  
    totalDefupp-apiPct: {    $multiply:[{$divide:[{$sum:['$totalDefupp-apiFGs', '$totalDefupp-apiTDs']}, '$totalDefupp-apis']}, 100]  },  
    totalOff2PtConvPct: {    $multiply:[{$divide:['$totalOff2PtConv', '$totalOff2PtAtt']}, 100]  },  
    totalOff3rdDownConvPct: {    $multiply:[{$divide:['$totalOff3rdDownConv', '$totalOff3rdDownAtt']}, 100]  },  
    totalOff4thDownConvPct: {    $multiply:[{$divide:['$totalOff4thDownConv', '$totalOff4thDownAtt']}, 100]  },  
    totalOffupp-apiPct: {    $multiply:[{$divide:[{$sum:['$totalOffupp-apiFGs', '$totalOffupp-apiTDs']}, '$totalOffupp-apis']}, 100]  }} 
  }]
  db.get().db('stats').collection('stat').aggregate(pipeline).toArray((err, docs) => {
    return cb(err, docs)
  })
}

