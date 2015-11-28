module.exports = (function(){

  function CreateProjectForm(elem, dataSource){
    this.isOpen = false;
    this.kendoWindow = elem.kendoWindow({
      actions: [],
      animation: {
        open: {
          duration: 100
        }
      },
      position: {
        top: 110
      },
      width: 600,
      height: 450,
      visible: false
    }).data('kendoWindow');

    this.dataSource = dataSource;
    this.model = new dataSource.options.schema.model();

    this.inputs = {
      projectedStart: elem.find('[data-role="projectedStart"]')
        .first()
        .kendoDatePicker()
        .data('kendoDatePicker'),

      projectedEnd: elem.find('[data-role="projectedEnd"]')
        .first()
        .kendoDatePicker()
        .data('kendoDatePicker'),

      title: elem.find('[data-role="title"]')
        .first()
        .kendoMaskedTextBox()
        .data('kendoMaskedTextBox'),

      description: elem.find('[data-role="description"]')
        .first()
        .kendoEditor()
        .data('kendoEditor')
    };

    this.submitButton = elem.find('[data-role="submit-button"]');
    this.submitButton.on('click', this.submit.bind(this));

    this.cancelButton = elem.find('[data-role="cancel-button"]');
    this.cancelButton.on('click', this.cancel.bind(this));
  }

  CreateProjectForm.prototype.open = function(){
    if (!this.isOpen) {
      this.kendoWindow.open();
      this.isOpen = true;
    }
  };

  CreateProjectForm.prototype.close = function(){
    this.isOpen = false;
    this.kendoWindow.close();
  };

  CreateProjectForm.prototype.destroy = function(){
    _.each(this.inputs, function(widget){
      widget.destroy();
    });
    this.kendoWindow.destroy();
  };

  CreateProjectForm.prototype.submit = function(){
    _.each(this.inputs, function(widget, field){
      this.model.set(field, widget.value());
    }, this);
    this.dataSource.add(this.model);
    this.dataSource.sync();
    this.close();
  };

  CreateProjectForm.prototype.cancel = function(){
    this.close();
  };

  return CreateProjectForm;

}());
