var app = require('./app.js');

// Routes
var site = require('./routes/site.js');
 
app.get('/', site.home);

var server = app.listen(3000);
