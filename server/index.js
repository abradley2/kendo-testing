var app = require('./app.js');

// Routes
var site = require('./routes/site.js'),
    title = require('./routes/title.js'),
    projects = require('./routes/projects.js'),
    team = require('./routes/team.js');

app.get('/', site.home);
app.get('/title', title.getTitle);
app.post('/title', title.setTitle);
app.put('/title', title.setTitle);
app.get('/projects', projects.getProjects);
app.get('/projects/:projectDetailId', projects.getProjectDetails);
app.get('/team', team.getTeam);

var server = app.listen(3000);
