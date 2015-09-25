window._ = require('lodash');
require('../../node_modules/bootstrap/dist/js/npm.js');

$(document).ready(function(){
  window.api = require('./api.js');
  window.viewManager = require('./viewManager');
  window.router = require('./router.js');
  router.start();
});
