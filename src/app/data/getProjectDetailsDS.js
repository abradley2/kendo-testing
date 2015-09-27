function getProjectDetailsDS(projectDetailId){

  var projectDetailModel = {
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

  var projectDetailsDS = new kendo.data.HierarchicalDataSource({

    schema: {
      model: {
        children: 'items'
      }
    },

    transport: {
      read: {
        url: '/projects/' + projectDetailId,
        dataType: 'json'
      }
    }

  });

  return projectDetailsDS;
}

module.exports = getProjectDetailsDS;
