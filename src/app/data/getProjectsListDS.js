function getProjectsListDS(){
  var projectModel = {
    id: 'id',
    fields: {
      'id': {
        type: 'number',
        editable: false
      },
      'title': {
        type: 'string',
        editable: true
      },
      'description': {
        type: 'string',
        editable: true
      },
      'manager': {
        type: 'string',
        editable: true
      },
      'projectedStart': {
        type: 'date',
        editable: true
      },
      'start': {
        type: 'date',
        editable: true
      },
      'projectedEnd': {
        type: 'date',
        editable: true
      },
      'end': {
        type: 'date',
        editable: true
      }
    }
  };

  var projectsListDS = new kendo.data.DataSource({
    transport: {
      create: {
        url: '/projects',
        dataType: 'json',
        type: 'POST'
      },
      read: {
        url: '/projects',
        dataType: 'json',
        type: 'GET'
      },
      update: {
        url: function(model){
          return '/projects/' + model.id;
        },
        dataType: 'json',
        type: 'PUT'
      },
      destroy: {
        url: function(model){
          return '/projects/' + model.id;
        },
        dataType: 'json',
        type: 'DELETE'
      }
    },
    schema: {
      model: projectModel,
      parse: function(res){
        /*
        _.each(res, function(item){
          item.manager = JSON.stringify(item.manager);
        });
        */
        return res;
      }
    },
    page: 1,
    pageSize: 10
  });

  return projectsListDS;
}

module.exports = getProjectsListDS;
