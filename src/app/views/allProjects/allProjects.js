// todo: grid does not work for mobile. Have a listView ready

function getProjectDetails(event){
  var detailRow = event.detailRow;
  var projectDetailsDS = api.getProjectDetailsDS(event.data.id);

  projectDetailsDS.fetch(function(){
    var tasksDS = this.get('tasks').ds,
        teamDS = this.get('team').ds;

    var tasksPager = $(detailRow).find('.tasks-pager').kendoPager({
      dataSource: tasksDS
    });

    var teamPager = $(detailRow).find('.team-pager').kendoPager({
      dataSource: teamDS
    });

    var tasksGrid = $(detailRow).find('.tasks-container').kendoGrid({
      dataSource: tasksDS,
      pager: tasksPager,
      columns: [
        {
          field: 'title',
          title: 'Title'
        },
        {
          field: 'completed',
          title: 'Completed'
        }
      ]
    });

    var teamGrid = $(detailRow).find('.team-container').kendoGrid({
      dataSource: teamDS,
      pager: teamPager,
      columns: [
        {
          field: 'name',
          title: 'Name'
        },
        {
          field: 'position',
          title: 'Position'
        }
      ]
    });

  });
}

function allProjects(params){
  var self = this;
  this.evalTemplate = false;

  this.model = kendo.observable({
    projectsListDS: api.getProjectsListDS(),
    hasChanges: false,
    titleSearchValue: '',
    searchByTitle: function(){
      this.projectsListDS.filter({
        field: 'title',
        operator: 'contains',
        value: this.titleSearchValue
      });
    },
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
          title: 'Links',
          filterable: false,
          groupable: false,
          sortable: false,
          template: $('#projects-grid-action-template').html()
        },
        {
          field: 'title',
          title: 'Title'
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
        },
        {
          field: '',
          command: 'destroy'
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
