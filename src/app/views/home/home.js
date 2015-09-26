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
  };
}

module.exports = home;
