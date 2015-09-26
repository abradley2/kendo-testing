var levelup = require('levelup');

var dbh = levelup('./level', {
  createIfMissing: false,
  errorIfExists: false
},open);

function open(err){
  if(err){
    console.log('error! ',err);
  } else {
    console.log('db open!');
  }
}
