function home(){
  console.log('RENDER HOME!');
  viewManager.render({
    layout: 'default',
    views: ['home']
  });
}

module.exports = home;
