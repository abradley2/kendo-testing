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

  var sampleListDS = new kendo.data.DataSource({
    schema: {
      model: sampleListItem
    }
  });

  return sampleListDS;
}

module.exports = getSampleListDS;
