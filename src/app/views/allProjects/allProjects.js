function allProjects(params){
  var self = this;
  this.evalTemplate = true;

  this.model = kendo.observable({
    title: "All Projects",
    createProjectDialog: function(){

    }
  });

  this.show = function(){
    var self = this;
    $('#projects-listview').kendoGrid({
      dataSource: self.listViewDS,
      template: "<div>#:name#</div>"
    });
  };

  this.hide = function(){

  };

  this.init = function(){
    var self = this;
    this.listViewDS = api.getProjectsListDS();
    console.log('listViewDS = ',this.listViewDS);
  };

}

module.exports = allProjects;
