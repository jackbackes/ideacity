console.log("Initializing server");


// Get required components
var server = require('./js/server.js');
var router = require('./js/router.js');
var pageserver = require('./js/pageserver.js');
var jsDotjs = require('js.js');

//Start the server

server.Start(router.route, pageserver.serve, pageserver.reqtype);

//check authorization
function checkAuth(req,res,next) {
	console.log('Check Authorization for ' + req.url);

	//if you aren't logged in, you won't be able to access /secure files
	//every secure url should be added to this list
	if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
		res.render('unauthorized', {status: 403});
		return;
	}

	next();

}





