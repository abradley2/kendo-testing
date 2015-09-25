var app = require('./app.js');

// Routes
var site = require('./routes/site.js'),
    title = require('./routes/title.js'),
    projects = require('./routes/projects.js');

app.get('/', site.home);
app.get('/title', title.getTitle);
app.post('/title', title.setTitle);
app.put('/title', title.setTitle);
app.get('/projects', projects.getProjects);



var server = app.listen(3000);
