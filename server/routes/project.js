var dbh = require('../dbh.js'),
    _ = require('lodash');


exports.getProject = function(req, res){
  var tasks = [];
  dbh.createReadStream({
    lt: 'task~' + req.body.id + '~!',
    gt: 'task~' + req.body.id + '~~'
  })
    .on('data', function(data){
      tasks.push(JSON.parse(data.value));
    })
    .on('end', function(){
      res.json(tasks);
    });
};
