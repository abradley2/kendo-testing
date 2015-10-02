function project(projectId){

  this.model = kendo.observable({
    projectId: projectId,
    ganttDS: api.getProjectGanttTasksDS(projectId),
    dependenciesDS: api.getProjectGanttDependenciesDS(projectId),
    clearData: function(){
      function wipe(dataSource){
        if(!_.isUndefined(dataSource.at(0))){
          dataSource.remove(dataSource.at(0));
          wipe(dataSource);
        } else {
          dataSource.sync();
        }
      }
      wipe(this.ganttDS);
      wipe(this.dependenciesDS);
    }
  });

  this.show = function(){
    window.dataSource = this.model.ganttDS;
    $('#project-gantt-container').kendoGantt({
      dataSource: this.model.ganttDS,
      dependencies: this.model.dependenciesDS
    });
  };

  this.hide = function(){

  };

  this.init = function(){

  };

}

module.exports = project;
