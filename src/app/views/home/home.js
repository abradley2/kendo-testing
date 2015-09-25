function home(params){
  var self = this;
  this.evalTemplate = true;
  this.model = {
    title: "Welcome to Tony's awesome Kendo App"
  };
  this.show = function(){
    console.log('show: ',this);
  };
  this.hide = function(){
    console.log('hide: ',this);
  };
  this.init = function(){
    console.log('init: ',this);
  };
}

module.exports = home;
