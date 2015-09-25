function home(params){
  var self = this;
  this.evalTemplate = true;
  this.model = kendo.observable({
    title: 'I am the default title'
  });
  this.show = function(){

  };
  this.hide = function(){

  };
  this.init = function(){
    var self = this;
    this.titleDS = api.getTitleDS();
    this.titleDS.fetch(function(){
      self.model.set('title',this.get('title').value);
    });
  };
}

module.exports = home;
