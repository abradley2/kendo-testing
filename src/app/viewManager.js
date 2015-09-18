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
    if (!this.layouts[layout].isRendered){
      this.layouts[layout].controller.render($('body'));
    }
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

  ViewManager.prototype.renderView = function(newView){
    var self = this;
    if(_.isArray(newView)){
      _.each(newView, function(view){
        self.renderView(view, params);
      });
    } else {
      this.renderLayout(this.views[newView].layout);
      this.views[newView].isRendered = true;
      if (_.isNull(this.views[newView].controller)){
        this.views[newView].controller =  new this.views[newView].factory();
      }
      this.activeLayout.showIn(
        this.views[newView].el,
        this.views[newView].controller
      );
    }
  };

  ViewManager.prototype.render = function(view, params){
    this.cleanup(view);
    this.renderView(view, params);
  };

  return ViewManager;
})();

module.exports = new ViewManager();
