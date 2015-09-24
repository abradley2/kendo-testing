ko.bindingHandlers.initComponent = {
  init: function(elem, value, allBindings, viewModel, bindingContext){
    if (!_.isUndefined(viewModel) && _.isFunction(viewModel.initComponent)){
      viewModel.initComponent(elem);
    }
  }
};
