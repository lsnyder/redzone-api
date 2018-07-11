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
      var poo = _calculateTotals(stat)
      console.log('$$$$', poo)
    }
    bulk.find({statId:stat.statId, type:stat.type}).upsert().updateOne(stat)
  })
  bulk.execute();
  cb()
},

_calculateTotals = () => {
  var pipeline = [{ 
    $match:{
      teamId:stat.teamId, 
      weekIndex:{$lte:stat.weekIndex}, 
      type:'team', 
      stageIndex:stat.stageIndex
    } 
  }, { 
    $group:{  
      _id: null,  
      id: {    $last: '$_id'  },  
      teamId: {    $last:'$teamId'  },  
      defForcedFum: {    $last:'$defForcedFum'  },  
      totalDefForcedFum: {    $sum:'$defForcedFum'  },  
      defFumRec: {    $last:'$defFumRec'  },  
      totalDefFumRec: {    $sum:'$defFumRec'  },  
      defIntsRec: {    $last:'$defIntsRec'  },  
      totalDefIntsRec: {    $sum:'$defIntsRec'  },  
      defPtsPerGame: {    $last:'$defPtsPerGame'  },  
      defPassYds: {    $last:'$defPassYds'  },  
      totalDefPassYds: {    $sum:'$defPassYds'  },  
      defRushYds: {    $last:'$defRushYds'  },  
      totalDefRushYds: {    $sum:'$defRushYds'  },  
      defRedZoneFGs: {    $last:'$defRedZoneFGs'  },  
      totalDefRedZoneFGs: {    $sum:'$defRedZoneFGs'  },  
      defRedZones: {    $last:'$defRedZones'  },  
      totalDefRedZones: {    $sum:'$defRedZones'  },  
      defRedZonePct: {    $last:'$defRedZonePct'  },  
      defRedZoneTDs: {    $last: '$defRedZoneTDs'  },  
      totalDefRedZoneTDs: {    $sum: '$defRedZoneTDs'  },  
      defSacks: {    $last: '$defSacks'  },  
      totalDefSacks: {    $sum: '$defSacks'  },  
      defTotalYds: {    $last: '$defTotalYds'  },  
      totalDefTotalYds: {    $sum: '$defTotalYds'  },  
      off4thDownAtt: {    $last:'$off4thDownAtt'  },  
      totalOff4thDownAtt: {    $sum:'$off4thDownAtt'  },  
      off4thDownConv: {    $last:'$off4thDownConv'  },  
      totalOff4thDownConv: {    $sum:'$off4thDownConv'  },  
      off4thDownConvPct: {    $last:'$off4thDownConvPct'  },  
      offFumLost: {    $last:'$offFumLost'  },  
      totalOffFumLost: {    $sum:'$offFumLost'  },  
      offIntsLost: {    $last:'$offIntsLost'  },  
      totalOffIntsLost: {    $sum:'$offIntsLost'  },  
      off1stDowns: {    $last:'$off1stDowns'  },  
      totalOff1stDowns: {    $sum:'$off1stDowns'  },  
      offPtsPerGame: {    $last:'$offPtsPerGame'  },  
      offPassTDs: {    $last:'$offPassTDs'  },  
      totalOffPassTDs: {    $sum:'$offPassTDs'  },  
      offPassYds: {    $last:'$offPassYds'  },  
      totalOffPassYds: {    $sum:'$offPassYds'  },  
      offRushTDs: {    $last:'$offRushTDs'  },  
      totalOffRushTDs: {    $sum:'$offRushTDs'  },  
      offRushYds: {    $last:'$offRushYds'  },  
      totalOffRushYds: {    $sum:'$offRushYds'  },  
      offRedZoneFGs: {    $last:'$offRedZoneFGs'  },  
      totalOffRedZoneFGs: {    $sum:'$offRedZoneFGs'  },  
      offRedZones: {    $last:'$offRedZones'  },  
      totalOffRedZones: {    $sum:'$offRedZones'  },  
      offRedZonePct: {    $last:'$offRedZonePct'  },  
      offRedZoneTDs: {    $last:'$offRedZoneTDs'  },  
      totalOffRedZoneTDs: {    $sum:'$offRedZoneTDs'  },  
      offSacks: {    $last:'$offSacks'  },  
      totalOffSacks: {    $sum:'$offSacks'  },  
      off3rdDownAtt: {    $last:'$off3rdDownAtt'  },  
      totalOff3rdDownAtt: {    $sum:'$off3rdDownAtt'  },  
      off3rdDownConv: {    $last:'$off3rdDownConv'  },  
      totalOff3rdDownConv: {    $sum:'$off3rdDownConv'  },  
      off3rdDownConvPct: {    $last:'$off3rdDownConvPct'  },  
      off2PtAtt: {    $last:'$off2PtAtt'  },  
      totalOff2PtAtt: {    $sum:'$off2PtAtt'  },  
      off2PtConv: {    $last:'$off2PtConv'  },  
      totalOff2PtConv: {    $sum:'$off2PtConv'  },  
      off2PtConvPct: {    $last:'$off2PtConvPct'  },  
      offTotalYds: {    $last:'$offTotalYds'  },  
      totalOffTotalYds: {    $sum:'$offTotalYds'  },  
      offTotalYdsGained: {    $sum:'$offTotalYdsGained'  },  
      penalties: {    $last:'$penalties'  },  
      totalPenalties: {    $sum:'$penalties'  },  
      penaltyYds: {    $last:'$penaltyYds'  },  
      totalPenaltyYds: {    $sum:'$penaltyYds'  },  
      totalWins: {    $last:'$totalWins'  },  
      totalLosses: {    $last:'$totalLosses'  },  
      totalTies: {    $last:'$totalTies'  },  
      tODiff: {    $last:'$tODiff'  },  
      totalTODiff: {    $sum:'$tODiff'  },  
      tOGiveaways: {    $last:'$tOGiveaways'  },  
      totalTOGiveaways: {    $sum:'$tOGiveaways'  },  
      tOTakeaways: {    $last:'$tOTakeaways'  },  
      totalTOTakeaways: {    $sum:'$tOTakeaways'  },  
      weekIndex: {    $last:'$weekIndex'  },  
      type: {    $last: '$type'  },  
      seed: {    $last:'$seed'  },  
      seasonIndex: {    $last:'$seasonIndex'  },  
      statId: {    $last:'$statId'  },  
      scheduleId: {    $last:'$scheduleId'  },  
      stageIndex: {    $last:'$stageIndex'  }
    } 
  }, { $addFields:{  
    totalOff2PtConvPct: {    $multiply:[{$divide:['$totalOff2PtConv', '$totalOff2PtAtt']}, 100]  },  
    totalOff3rdDownConvPct: {    $multiply:[{$divide:['$totalOff3rdDownConv', '$totalOff3rdDownAtt']}, 100]  },  
    totalDefRedZonePct: {    $multiply:[{$divide:[{$sum:['$totalDefRedZoneFGs', '$totalDefRedZoneTDs']}, '$totalDefRedZones']}, 100]  },  
    totalOff4thDownConvPct: {    $multiply:[{$divide:['$totalOff4thDownConv', '$totalOff4thDownAtt']}, 100]  },  
    totalOffRedZonePct: {    $multiply:[{$divide:[{$sum:['$totalOffRedZoneFGs', '$totalOffRedZoneTDs']}, '$totalOffRedZones']}, 100]  }} 
  }]
  db.get().db('stats').collection('stat').aggregate(pipeline).toArray((err, docs) => {
    console.log("!!!!!", docs)
  })
}

