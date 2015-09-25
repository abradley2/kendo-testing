function about(){
  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'about'
    }
  });
}

module.exports = about;
