window.$ = window.jQuery  = require('jquery');
window._ = require('lodash');
window.ko = require('knockout');
require('./bindings/index.js');
require('./components/index.js');

$(document).ready(function(){
  window.api = require('./api.js');
  window.viewManager = require('./viewManager');
  window.router = require('./router.js');
  router.start();
});
