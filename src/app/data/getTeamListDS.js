function getTeamListDS(){
  var teamModel = {
    id: 'id',
    fields: {
      name: {
        type: 'text'
      },
      email: {
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

  var teamListDS = new kendo.data.DataSource({
    page: 1,
    pageSize: 10,
    schema: {
      model: teamModel
    },
    transport: {
      create: {
        url: '/team',
        dataType: 'json',
        type: 'POST'
      },
      read: {
        url: '/team',
        dataType: 'json',
        type: 'GET'
      },
      update: {
        url: '/team',
        dataType: 'json',
        type: 'PUT'
      },
      destroy: {
        url: '/team',
        dataType: 'json',
        type: 'DELETE'
      },
      parameterMap: function(data, type){
        if (type === 'destroy' || type === 'update'){
          console.log('destroy or update: ',data);
        }
        if (type === 'create'){
          console.log('create: ',data);
        }
      }
    }

  });

  return teamListDS;
}

module.exports = getTeamListDS;
