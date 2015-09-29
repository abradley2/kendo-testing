var dbh = require('../dbh.js'),
    _ = require('lodash');


exports.getProjects = function(req, res){
  var projects = [];
  dbh.createReadStream({gt: 'project~!', lt: 'project~~'})
    .on('data', function(data){
      projects.push(JSON.parse(data.value));
    })
    .on('end', function(){
      res.json(projects);
    });
};

exports.getProjectDetails = function(req, res){
  var projectId = req.params.projectDetailId,
      tasks = [],
      team = [];


  // readStreams are async, the order is as follows:
  // getTasks -> getTeam -> sendRes
  getTasks();


  function sendRes(){
    res.json({
      tasks: tasks,
      team: team
    });
  }

  function getTeam(){
    dbh.get('projectTeam~' + projectId, function(err, value){
      if(err){
        console.log('error = ',err);
      }
      team = JSON.parse(value);
      sendRes();
    });
  }

  function getTasks(){
    dbh.createReadStream({
      gt: ('task~' + projectId + '~!'),
      lt: ('task~' + projectId + '~~')
    })
      .on('data', function(data){
        var task = JSON.parse(data.value);

        if(task.end){
          task.completed = true
        } else {
          task.completed = false
        }
        tasks.push(task);

      })
      .on('end', getTeam);
  }

};
