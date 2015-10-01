function project(projectId){
  var self = this;
  console.log('view projectId = ',projectId);

  this.model = kendo.observable({
    projectId: projectId
  });

  this.show = function(){

  };

  this.hide = function(){

  };

  this.init = function(){
    console.log('projectId = ',this.model);
  };

}

module.exports = project;
