function teamMemberSelect(container, options){
  console.log('...getting teamMemberSelect editor...');
  $('<input type="select" data-text-field="name" data-value-field="name" data-bind="value: ' + options.field + '"/>"')
    .appendTo(container)
    .kendoDropDownList({
      dataSource: api.getTeamListDS()
    });
}

module.exports = teamMemberSelect;
