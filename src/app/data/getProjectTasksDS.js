function parse(res){
  return res;
}

function getProjectTasksDS(projectId){

  var projectTaskModel = kendo.data.Model.define({
    id: 'id',
    fields: {
      totalTasks: {
        type: 'number',
        editable: false
      },
      completedTasks: {
        type: 'number',
        editable: false
      },
      unfinishedTasks: {
        type: 'number',
        editable: false
      }
    }
  });

  var projectTasksDS = new kendo.data.DataSource({

    schema: {
      model: projectTaskModel,
      parse: parse
    }

  });

  return projectTasksDS;
}

module.exports = getProjectTasksDS;
