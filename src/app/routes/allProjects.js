function allProjects(){
  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'allProjects'
    }
  });
}

module.exports = allProjects;
