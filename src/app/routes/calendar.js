function calendar(){
  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'calendar'
    }
  });
}

module.exports = calendar;
