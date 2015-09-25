var dbh = require('../dbh.js'),
    _ = require('lodash');

dbh.put('project|f941912e-e091-4697-9f27-a5c3e208baf3|name','Sample Project One');
dbh.put('project|f941912e-e091-4697-9f27-a5c3e208baf3|manager','Tony Bradley');
dbh.put('project|f941912e-e091-4697-9f27-a5c3e208baf3|start','2132587235');
dbh.put('project|f941912e-e091-4697-9f27-a5c3e208baf3|projectedStart','356236236');
dbh.put('project|f941912e-e091-4697-9f27-a5c3e208baf3|end','375347242');
dbh.put('project|f941912e-e091-4697-9f27-a5c3e208baf3|projectedEnd','521353683');

exports.getProjects = function(req, res){
  var projects = [];
  dbh.createReadStream({gt: 'project!', lt: 'project~'})
    .on('data', function(data){
      var projectId = data.key.split('|')[1],
          attribute = data.key.split('|')[2],
          value = data.value,
          project = _.findWhere(projects, {id: projectId});
      if (_.isUndefined(project)){
        projects.push(_.zipObject([['id', projectId], [attribute, value]]));
      } else {
        project[attribute] = value;
      }
    })
    .on('end', function(){
      res.json(projects);
    });
}
