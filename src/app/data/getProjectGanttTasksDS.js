function parse(res){
  // TODO: cleanup to clearer recursive function
  function parseRes(res){
    if (_.isArray(res)){
      _.each(res, parseRes);
    } else {
      res.expanded = true;
      res.orderId = parseInt(res.orderId);
      res.summary = (res.summary === 'true');
      if(res.parentId === '' ){
        res.expanded = true;
        res.parentId = null;
      }
    }
  }
  parseRes(res);
  return res;
}

function getProjectGanttTasksDS(projectId){

  var projectTaskModel = kendo.data.GanttTask.define({
    id: 'id',
    fields: {
      id: {
        type: 'string',
        editable: false
      },
      orderId: {
        type: 'number',
        editable: true
      },
      start: {
        type: 'date',
        editable: true
      },
      end: {
        type: 'date',
        editable: true
      },
      title: {
        type: 'string',
        editable: true
      },
      description: {
        type: 'string',
        editable: true
      },
      percentComplete: {
        type: 'number',
        editable: true
      },
      parentId: {
        type: 'string',
        editable: true,
        nullable: true,
        defaultValue: null
      },
      expanded: {
        type: 'boolean',
        editable: true,
        nullable: true,
        defaultValue: true
      },
      summmary: {
        type: 'boolean',
        editable: true
      }
    }
  });

  var projectTasksDS = new kendo.data.GanttDataSource({
    schema: {
      model: projectTaskModel,
      parse: parse
    },
    transport: {
      read: {
        url: '/projectTasks/' + projectId,
        dataType: 'json',
        type: 'GET'
      },
      create: {
        url: '/projectTasks/' + projectId,
        dataType: 'json',
        type: 'PUT'
      },
      update: {
        url: '/projectTasks/' + projectId,
        dataType: 'json',
        type: 'POST'
      },
      destroy: {
        url: '/projectTasks/' + projectId,
        dataType: 'json',
        type: 'DELETE'
      }
    }
  });
  return projectTasksDS
}

module.exports = getProjectGanttTasksDS;
