function projects(){
  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'projects'
    }
  });
}

module.exports = projects;
