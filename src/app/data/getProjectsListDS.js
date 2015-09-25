function getProjectsListDS(){
  var projectModel = {
    id: 'id',
    fields: {
      'title': {
        type: 'string',
        editable: true
      },
      'manager': {
        type: 'string',
        editable: true
      },
      'projectedStart': {
        type: 'string',
        editable: true
      },
      'start': {
        type: 'string',
        editable: true
      },
      'projectedEnd': {
        type: 'string',
        editable: true
      },
      'end': {
        type: 'string',
        editable: true
      }
    }
  };

  var projectsListDS = new kendo.data.DataSource({
    transport: {
      create: {
        url: '/projects',
        dataType: 'json'
      },
      read: {
        url: '/projects',
        dataType: 'json'
      },
      update: {
        url: '/projects',
        dataType: 'json'
      },
      destroy: {
        url: '/projects',
        dataType: 'json'
      }
    },
    schema: {
      model: projectModel
    },
    page: 1,
    pageSize: 10
  });

  return projectsListDS;
}

module.exports = getProjectsListDS;
