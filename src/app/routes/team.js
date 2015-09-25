function team(){
  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'team'
    }
  });
}

module.exports = team;
