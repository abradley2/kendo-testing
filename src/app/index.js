window._ = require('lodash');

$(document).ready(function(){
  window.api = require('./api.js');
  window.viewManager = require('./viewManager');
  window.router = require('./router.js');
  router.start();
});
