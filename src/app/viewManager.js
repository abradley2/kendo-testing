var ViewManager = (function(){

  function ViewManager(){
    var self = this;
    this.activeLayout;
    this.layouts = {};
    this.views = {};
    _.each(require('./views/index.js'), function(params, view){
      self.views[view] = {
        factory: function(){
          return new kendo.View(params.template);
        },
        el: params.el,
        isRendered: false,
        controller: null
      };
    });
    _.each(require('./layouts/index.js'), function(template, layout){
      self.layouts[layout] = {
        factory: function(){
          return new kendo.Layout(template);
        },
        isRendered: false,
        controller: null
      };
    });
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

  ViewManager.prototype.renderView = function(newView, query){
    var self = this;
    if(_.isArray(newView)){
      _.each(newView, function(view){
        self.renderView(view, query);
      });
    } else {
      this.views[newView].isRendered = true;
      if (_.isNull(this.views[newView].controller)){
        this.views[newView].controller =  new this.views[newView].factory();
      }
      this.views[newView].controller.params = query;
      this.activeLayout.showIn(
        this.views[newView].el,
        this.views[newView].controller
      );
    }
  };

  ViewManager.prototype.render = function(params, query){
    this.cleanup(params.views);
    this.renderLayout(params.layout);
    this.renderView(params.views, query);
  };

  return ViewManager;
})();

module.exports = new ViewManager();
