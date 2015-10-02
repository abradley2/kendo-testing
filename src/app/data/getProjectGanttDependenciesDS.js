function getProjectGanttDependenciesDS(projectId){
  var projectDependencyModel = kendo.data.GanttDependency.define({
    id: 'id',
    fields: {
      id: {
        type: 'string'
      },
      predecessorId: {
        type: 'string'
      },
      successorId: {
        type: 'string'
      },
      type: {
        type: 'number'
      }
    }
  });

  var projectDependenciesDS = new kendo.data.GanttDependencyDataSource({
    schema: {
      model: projectDependencyModel,
      parse: function(res){
        if(_.isArray(res)){
          _.each(res, function(item){
            item.type = parseInt(item.type);
          });
        } else {
          res.type = parseInt(res.type)
        }
        return res;
      }
    },
    transport: {
      read: {
        url: '/projectDependencies/' + projectId,
        dataType: 'json',
        type: 'GET'
      },
      create: {
        url: '/projectDependencies/' + projectId,
        dataType: 'json',
        type: 'PUT'
      },
      update: {
        url: '/projectDependencies/' + projectId,
        dataType: 'json',
        type: 'POST'
      },
      destroy: {
        url: '/projectDependencies/' + projectId,
        dataType: 'json',
        type: 'DELETE'
      }
    }
  });
  return projectDependenciesDS
}

module.exports = getProjectGanttDependenciesDS;
