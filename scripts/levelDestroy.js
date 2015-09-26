require('leveldown').destroy('./level', function(err){
  if(err){
    console.log('error! ',err);
  } else {
    console.log('done!');
  }
});
