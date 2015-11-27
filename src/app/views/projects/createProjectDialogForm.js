

module.exports = function (elem, dataSource) {
  var kendoWindow = elem.data('kendoWindow'),
      projectModel = new dataSource.options.schema.model();

  var projectedStartWidget = elem.find('[data-role="projected-start"]')
    .first()
    .kendoDatePicker()
    .data('kendoDatePicker');

  var projectedEndWidget = elem.find('[data-role="projected-end"]')
    .first()
    .kendoDatePicker()
    .data('kendoDatePicker');

  var titleWidget = elem.find('[data-role="project-title"]')
    .first();

  var descriptionWidget = elem.find('[data-role="project-description"]')
    .first()
    .kendoEditor()
    .data('kendoEditor');

  elem.find('[data-role="submit"]')
    .on('click', function(){
      projectModel.set('projectedStart', projectedStartWidget.value());
      projectModel.set('projectedEnd', projectedEndWidget.value());
      projectModel.set('title', titleWidget.value());
      projectModel.set('description', descriptionWidget.value());
      dataSource.add(projectModel);
      dataSource.sync();
    });

};
