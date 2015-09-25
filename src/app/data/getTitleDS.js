function getTitleDS(){
  var titleModel = {
    id: 'id',
    fields: {
      'value': {
        type: 'string'
      }
    }
  };

  var titleDS = new kendo.data.DataSource({
    transport: {
      create: {
        url: '/title',
        dataType: 'json'
      },
      read: {
        url: '/title',
        dataType: 'json'
      },
      update: {
        url: '/title',
        dataType: 'json'
      }
    },
    schema: {
      model: titleModel
    }
  });

  return titleDS;
}

module.exports = getTitleDS;
