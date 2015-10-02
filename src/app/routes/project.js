function project(projectId){

  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'project'
    }
  }, projectId);
}

module.exports = project;
