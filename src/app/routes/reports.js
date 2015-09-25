function reports(){
  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'reports'
    }
  });
}

module.exports = reports;
