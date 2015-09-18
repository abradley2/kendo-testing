var express             = require('express');
var bodyParser          = require('body-parser');
var clientSessions      = require('client-sessions');

// App configuration
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//session variables available in req.SessionNameHere
/*
app.use(clientSessions,{
  cookieName: 'SessionNameHere',
  secret: 'AddSomeJumbledUpTextHere',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
});
*/
module.exports = app;
