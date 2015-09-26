var levelup = require('levelup'),
    fixtures = require('./fixtures.json'),
    _ = require('lodash');

_.each(fixtures, function(obj){
  obj.value = JSON.stringify(obj.value);
});

var dbh = levelup('./level', {
  createIfMissing: true,
  errorIfExists: false
},open);

function open(err){
  if(err){
    console.log('error! ',err);
  } else {
    dbh.batch(fixtures, function(err){
      if(err){
        console.log('error! ',err);
      } else {
        console.log('done!');
      }
    });
  }
}
