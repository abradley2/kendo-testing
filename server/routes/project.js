var dbh = require('../dbh.js'),
    _ = require('lodash'),
    uuid = require('node-uuid');


exports.getProjectTasks = function(req, res){
  var tasks = [],
      projectId = req.params.projectId;

  dbh.createReadStream({
    gt: ('task~' + projectId + '~!'),
    lt: ('task~' + projectId + '~~')
  })
    .on('data', function(data){
      tasks.push(JSON.parse(data.value));
    })
    .on('end', function(){
      res.json(tasks);
    });
};

exports.getProjectDependencies = function(req, res){
  var dependencies = [],
      projectId = req.params.projectId;

    dbh.createReadStream({
      gt: ('dependency~' + projectId + '~!'),
      lt: ('dependency~' + projectId + '~~')
    })
    .on('data', function(data){
      dependencies.push(JSON.parse(data.value));
    })
    .on('end', function(){
      res.json(dependencies);
    });
};

exports.updateProjectTask = function(req, res){
  var projectId = req.params.projectId,
      updatedTask = {
        id: req.body.id,
        start: req.body.start,
        end: req.body.end,
        description: req.body.description,
        percentComplete: req.body.percentComplete,
        title: req.body.title,
        parentId: req.body.parentId,
        orderId: req.body.orderId,
        summary: req.body.summary
      };

  var key = 'task~' + projectId + '~' + updatedTask.id;
  var value = JSON.stringify(updatedTask);

  dbh.put(key, value, function(err){
    if (err) {
      console.log('error: ',err);
    } else {
      res.json(updatedTask);
    }
  });
};

exports.deleteProjectTask = function(req, res){
  var projectId = req.params.projectId,
      taskId = req.body.id;

  var key = 'task~' + projectId + '~' + taskId;

  dbh.del(key, function(err){
    if(err){
      console.log('error: ',err);
    } else {
      res.json({})
    }
  });
};

exports.createProjectTask = function(req, res){
  var projectId = req.params.projectId,
      newTask = {
        id: uuid.v4(),
        start: req.body.start,
        end: req.body.end,
        description: req.body.description,
        percentComplete: req.body.percentComplete,
        title: req.body.title,
        parentId: req.body.parentId,
        orderId: req.body.orderId,
        summary: req.body.summary
      };

  var key = 'task~' + projectId + '~' + newTask.id;
  var value = JSON.stringify(newTask);

  dbh.put(key, value, function(err){
    if (err) {
      console.log('error: ',err);
    } else {
      res.json(newTask);
    }
  });
};

exports.createProjectDependency = function(req, res){
  var projectId = req.params.projectId,
      newDependency = {
        id: uuid.v4(),
        successorId: req.body.successorId,
        predecessorId: req.body.predecessorId,
        type: req.body.type
      };

  var key = 'dependency~' + projectId + '~' + newDependency.id;
  var value = JSON.stringify(newDependency);

  dbh.put(key, value, function(err){
    if (err) {
      console.log('error: ',err);
    } else {
      res.json(newDependency);
    }
  });

};

exports.deleteProjectDependency = function(req, res){
  var projectId = req.params.projectId,
      dependencyId = req.body.id;

  var key = 'dependency~' + projectId + '~' + dependencyId;

  dbh.del(key, function(err){
    if(err){
      console.log('error: ',err);
    } else {
      res.json({})
    }
  });
};
