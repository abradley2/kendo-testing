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
      totalTasks = 0,
      completedTasks = 0,
      unfinishedTasks = 0;
  dbh.createReadStream({
    gt: ('task~' + projectId + '~!'),
    lt: ('task~' + projectId + '~~')
  })
    .on('data', function(data){
      var task = JSON.parse(data.value);

      if(task.end){
        totalTasks++;
        completedTasks++;
      } else {
        unfinishedTasks++;
      }

    })
    .on('end', function(){
      res.json(
        [
          {
            categoryName: 'Task Summary',
            items: [{
              totalTasks: totalTasks,
              completedTasks: completedTasks,
              unfinishedTasks: unfinishedTasks
            }]
          }
        ]
      );
    });

};
