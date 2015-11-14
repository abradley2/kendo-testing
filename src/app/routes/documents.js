function documents(){
  viewManager.render({
    layout: 'default',
    views: {
      '#navigation-region': 'navigation',
      '#content-region': 'documents'
    }
  });
}

module.exports = documents;
