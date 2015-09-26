var ViewManager = (function(){

  function viewFactory(views,type){
    var retVal = {};
    _.each(views, function(params, view){
      retVal[view] = {
        factory: function(){
          return new kendo[type](params.template, new params.viewModel());
        },
        isRendered: false,
        controller: null
      };
    });
    return retVal;
  }

  function ViewManager(layouts, views){
    this.activeLayout;
    this.layouts = viewFactory(layouts,'Layout');
    this.views = viewFactory(views,'View');
  }

  ViewManager.prototype.renderLayout = function(layout){
    _.each( _.omit(this.layouts, layout), function(layout){
      if (!_.isNull(layout.controller)){
        layout.controller.destroy();
      }
      layout.isRendered = false;
    });
    if (_.isNull(this.layouts[layout].controller)){
      this.layouts[layout].controller = new this.layouts[layout].factory();
    }
    this.layouts[layout].controller.render($('body'));
    this.activeLayout = this.layouts[layout].controller
  };

  ViewManager.prototype.cleanup = function(excludes){
    _.each( _.omit(this.views, excludes), function(view){
      view.isRendered = false;
      if (!_.isNull(view.controller)){
        view.controller.destroy();
      }
      view.controller = null;
    });
  };

  ViewManager.prototype.renderView = function(newViews, query){
    var self = this;
    _.each(newViews, function(newView, region){
      self.views[newView].isRendered = true;
      if (_.isNull(self.views[newView].controller)){
        self.views[newView].controller =  new self.views[newView].factory(query);
      }
      self.activeLayout.showIn(
        region,
        self.views[newView].controller
      );
    });
  };

  ViewManager.prototype.render = function(params, query){
    this.cleanup(_.values(params.views));
    this.renderLayout(params.layout);
    this.renderView(params.views, query);
  };

  return ViewManager;
})();

module.exports = new ViewManager(
  require('./layouts/index.js'),
  require('./views/index.js')
);
