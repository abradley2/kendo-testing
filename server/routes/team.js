var dbh = require('../dbh.js'),
    _ = require('lodash');

exports.getTeam = function(req, res){
  var team = [];
  dbh.createReadStream({
    gt: 'team~!',
    lt: 'team~~'
  })
    .on('data', function(data){
      team.push(JSON.parse(data.value));
    })
    .on('end', function(){
      res.json(team)
    });

};
