function project(){
  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'project'
    }
  });
}

module.exports = project;
