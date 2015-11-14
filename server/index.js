var app = require('./app.js');

// Routes
var site = require('./routes/site.js'),
    projects = require('./routes/projects.js'),
    project = require('./routes/project.js'),
    team = require('./routes/team.js');

app.get('/', site.home);
app.get('/projects', projects.getProjects);
app.delete('/projects/:projectId', projects.deleteProject);
app.get('/projects/:projectDetailId', projects.getProjectDetails);
app.get('/team', team.getTeam);
app.get('/projectTasks/:projectId',project.getProjectTasks);
app.get('/projectDependencies/:projectId',project.getProjectDependencies);
app.post('/projectTasks/:projectId',project.updateProjectTask);
app.delete('/projectTasks/:projectId',project.deleteProjectTask);
app.put('/projectTasks/:projectId',project.createProjectTask);
app.put('/projectDependencies/:projectId',project.createProjectDependency);
app.delete('/projectDependencies/:projectId',project.deleteProjectDependency);

var server = app.listen(3000);
