function defaultLayout(){
  var self = this;
  this.evalTemplate = true;
  this.model = {
    title: "this is the default layout"
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
module.exports = defaultLayout;
