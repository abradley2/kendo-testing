// This dataSource is a container for ProjectTasksDS + ProjectTeamDS
function getProjectDetailsDS(projectDetailId){

  var taskModel = {
    id: 'id',
    fields: {
      completed: {
        type: 'boolean'
      },
      title: {
        type: 'text'
      },
      start: {
        type: 'date'
      },
      end: {
        type: 'date'
      }
    }
  };

  var teamModel = {
    id: 'id',
    fields: {
      email: {
        type: 'text'
      },
      name: {
        type: 'text'
      },
      phone: {
        type: 'text'
      },
      position: {
        type: 'text'
      }
    }
  };

  var projectDetailsDS = new kendo.data.DataSource({

    transport: {
      read: {
        url: '/projects/' + projectDetailId,
        dataType: 'json'
      }
    },

    schema: {
      parse: function(res){
        var tasksDS = new kendo.data.DataSource({
          data: res.tasks,
          page: 1,
          pageSize: 10,
          schema: {
            model: taskModel
          }
        });
        tasksDS.read();
        var teamDS = new kendo.data.DataSource({
          data: res.team,
          page: 1,
          pageSize: 10,
          schema: {
            model: teamModel
          }
        });
        teamDS.read();
        return [
          {
            id: 'tasks',
            ds: tasksDS
          },
          {
            id: 'team',
            ds: teamDS
          }
        ];
      }
    }

  });
  return projectDetailsDS;
}

module.exports = getProjectDetailsDS;
