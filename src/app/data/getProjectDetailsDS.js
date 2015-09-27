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
          schema: {
            model: taskModel
          },
          group: {
            field: 'status',
            aggregates: [
              {field: 'title', aggregate: 'count'}
            ]
          }
        });
        tasksDS.read();
        console.log('tasksDS = ',tasksDS);
        var teamDS = new kendo.data.DataSource({
          data: res.team,
          schema: {
            model: teamModel
          }
        });
        teamDS.read();
        console.log('teamDS = ',teamDS);
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
