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

exports.deleteProject = function(req, res){
  var projectId = req.params.projectId;

  var batchDelete = _.curry(function batchDelete(project, projectTasks, projectDependencies, projectTeam) {
    var batch = _.flatten(project, projectTasks, projectDependencies, projectTeam);

    dbh.batch(batch, function (err) {
      if (err) {
        res.json(batch);
      } else {
        res.json(batch);
      };
    });

    return true;
  });

  (function deleteProject(){
    var batch = [{type: 'del', key: 'project~' + projectId }];
    batchDelete = batchDelete(batch, _, _, _);
  })();

  (function deleteProjectTasks(){
    var batch = [];

    dbh.createReadStream({
      gt: ('task~' + projectId + '~!'),
      lt: ('task~' + projectId + '~~')
    }).on('data', function(data){
      batch.push({type: 'del', key: data.key});
    }).on('end', function(){
      batchDelete = batchDelete(_, batch, _, _);
    });
  })();

  (function deleteProjectDependencies(){
    var batch = [];

    dbh.createReadStream({
      gt: ('dependency~' + projectId + '~!'),
      lt: ('dependency~' + projectId + '~~')
    }).on('data', function(data){
      batch.push({type: 'del', key: data.key});
    }).on('end', function(){
      batchDelete = batchDelete(_, _, batch, _);
    });
  })();

  (function deleteProjectTeam(){
    var batch = [];

    dbh.createReadStream({
      gt: ('projectTeam~' + projectId + '~!'),
      lt: ('projectTeam~' + projectId + '~~')
    }).on('data', function(data){
      batch.push({type: 'del', key: data.key});
    }).on('end', function(){
      batchDelete = batchDelete(_, _, _, batch);
    });
  })();
}

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
