router = new kendo.Router()

routes = require('./routes/index.js');

_.each(routes, function(route,url){

  router.route(url, route);

});

module.exports = router;
