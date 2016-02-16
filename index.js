console.log("Initializing server");
// Get required components
var server = require('./js/server.js');
var router = require('./js/router.js');
var pageserver = require('./js/pageserver.js');

//Start the server

server.Start(router.route, pageserver.serve, pageserver.reqtype);