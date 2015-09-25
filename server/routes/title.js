var dbh = require('../dbh.js'),
    _ = require('lodash');

exports.getTitle = function(req, res){
  dbh.get('title', function(err, value){
    if(err){
      // console.log('error = ',err);
      res.json({'error': false});
    } else {
      res.json([{'id': 'title', 'value': value}]);
    }
  });
};

exports.setTitle = function(req, res){
  dbh.put('title', req.body.title, function(err){
    if(err){
      // console.log('error = ',err);
      res.json({'error': false});
    } else {
      res.json([{'id': 'title', 'value': req.body.title}]);
    }
  });
};
