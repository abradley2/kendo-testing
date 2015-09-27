function getProjectTasksDS(projectId){

  var projectTaskModel = {
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
  };

  var projectTasksDS = new kendo.data.DataSource({

    schema: {
      model: projectTaskModel
    }

  });

  return projectTasksDS;
}

module.exports = getProjectTasksDS;
