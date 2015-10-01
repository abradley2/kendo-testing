function project(projectId){
  console.log('route param = ',projectId);
  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'project'
    }
  }, projectId);
}

module.exports = project;
