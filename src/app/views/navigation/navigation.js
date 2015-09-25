function navigation(params){
  var self = this;
  this.evalTemplate = true;
  this.model = {
    title: "this is the home page"
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

module.exports = navigation;
