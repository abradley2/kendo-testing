function createTransport(data){
  console.log('createTransport()',data);
}

function updateTransport(data){
  console.log('updateTransport()',data);
}

function getProjectsListDS(){
  var projectModel = kendo.data.Model.define({
    id: 'id',
    fields: {
      'id': {
        type: 'string',
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
  });

  var projectsListDS = new kendo.data.DataSource({
    transport: {
      create: {
        url: '/projects',
        dataType: 'json',
        type: 'POST',
        data: createTransport
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
        type: 'PUT',
        data: updateTransport
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
