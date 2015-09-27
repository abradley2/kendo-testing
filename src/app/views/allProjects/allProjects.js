// todo: grid does not work for mobile. Have a listView ready

function getProjectDetails(event){
  var detailRow = event.detailRow;
  var projectDetailsDS = api.getProjectDetailsDS(event.data.id);
  projectDetailsDS.fetch(function(){
    console.log('projectDetailsDS = ',this);
  });
}

function allProjects(params){
  var self = this;
  this.evalTemplate = true;

  this.model = kendo.observable({
    projectsListDS: api.getProjectsListDS(),
    hasChanges: false,
    saveChanges: function(){
      this.projectsListDS.sync();
    },
    cancelChanges: function(){
      this.projectsListDS.cancelChanges();
    },
    createProjectDialog: function(){

    }
  });

  this.show = function(){
    var self = this;

    this.pager = $('#projects-pager').kendoPager({
      dataSource: self.model.projectsListDS
    });

    this.grid = $('#projects-grid').kendoGrid({
      dataSource: self.model.projectsListDS,
      detailTemplate: kendo.template($('#projects-grid-detail-template').html()),
      detailInit: getProjectDetails,
      pager: self.pager,
      editable: true,
      filterable: true,
      sortable: true,
      groupable: false,
      selectable: true,
      change: function(event){
        var grid = event.sender;
        $('#projects-grid').find('.k-master-row').each(function(idx,row){
          grid.collapseRow(row)
        });
        grid.expandRow(this.select());
      },
      columns: [
        {
          field: 'id',
          template: "<a href='\\#project/#= id #'>View Project</a>"
        },
        {
          field: 'title',
          title: 'Title'
        },{
          field: 'manager',
          title: 'Manager'
        },/*{
          field: 'projectedStart',
          title: 'Projected Start'
        },*/{
          field: 'start',
          title: 'Start'
        },/*{
          field: 'projectedEnd',
          title: 'Projected End'
        },*/{
          field: 'end',
          title: 'End'
        }
      ]
    });
  };

  this.hide = function(){

  };

  this.init = function(){
    var self = this;
    this.model.projectsListDS.bind('change', function(){
      self.model.set('hasChanges', this.hasChanges());
    });
  };

}

module.exports = allProjects;
