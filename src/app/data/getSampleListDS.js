function getSampleListDS(){
  var sampleListItem = kendo.data.Model.define({
    id: 'id',
    fields: {
      'title': {
        type: 'string',
        editable: true
      }
    }
  });

  var sampleList = new kendo.data.DataSource({
    schema: {
      model: sampleListItem
    }
  });
}

module.exports = getSampleListDS;
