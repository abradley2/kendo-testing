var levelup = require('levelup');

var dbh = levelup('./level');

module.exports = dbh;
