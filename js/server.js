//the Node server backend for Ideacity

console.log('getting required modules');
console.log('initializing express from server.js');
var express = require('express'); console.log('express initialized from server.js');
var app = express();
var mongoose = require('mongoose');
var configAuth = require('../config/auth.js');
console.log(configAuth.facebookAuth.clientID);
var passport = require('passport');
var flash = require('connect-flash');
var configDB = require('../config/database.js');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var prompt = require('prompt');


console.log('running configuration tests');
//Configuration tests==============================================

//Set Database Configuration
console.log(configDB.url);
mongoose.connect(configDB.url); //connect to our database

require('../config/passport')(passport); //pass passport for configuration

//Configure Express
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read Cookies (needed for auth)
app.use(bodyParser()); //get information from html forms
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}
app.use(express.static('public', options));

app.set('view engine', 'ejs'); //set up ejs for templating

// configure passport
try{
	console.log('configuring passport');
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch'})); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
} catch(err){console.log('passport error: ' + err)};

// routes ============
var routes = require('../app/routes.js')(app, passport, express);

//Set Server Configuration
	var appConfig = {
		isTest: 'y',
		isLive: 'heroku',
		verbose: true
	};

	prompt.start();
	prompt.get('test', function (err,result) {
		console.log('Your configuration:');
		console.log('test: ' + result.test);
		appConfig.test = result.test;
		/*console.log('live: ' + result.live);
		appConfig.live = result.live;*/
	});
	console.log('confirm',appConfig.test /*,appConfig.live*/);



//Configure host

if(appConfig.isLive === 'heroku') {
	var ideaServer = 'ideacity.herokuapp.com';
} else if(appConfig.isLive === 'y') {
	var ideaServer = 'ideacity.thisismotive.com';
} else {
	var ideaServer = 'localhost';
};
	console.log('server set to ' + ideaServer);

var ideaPort = process.env.PORT || 1337;
	console.log('port set to ' + ideaPort);

// Get required Modules


//start the service
var Start = function(route, serve, reqtype, postToJSON) {
	// Listener launched when there is a request.
	var onRequest = function(req, res) {

		//Extracts the pathname from the url
		var pathname = url.parse(req.url).pathname;

		// Removes the starting '/'. If this fails, then the request
		// was without the '/', so it is not affected
		try {
			pathname = pathname.substring(1, pathname.length);
		} catch(err) {

		}
		if (pathname !== 'favicon.ico') {

			// Get the path from the router
			var path = route(pathname);
			console.log('Path has been generated');
			// Gets html or whatever will be written from the pageserver
			var html = "";

			html = serve(path);
			console.log('HTML has been generated');

			//Gets the type from the pageserver
			var type = reqtype(path);
			console.log('Filetype has been found: ' + type);

		}
		// Responds to all requests apart from that for favicon.ico
		if (pathname !== 'favicon.ico' && req.method !== 'POST') {
			console.log('Request has been received');


			//Writes what type of data will be sent. Dynamically sets the file ending.
			res.writeHead(200, {
				'Content-Type' : 'text/' + type
			});

			//Writes to output
			console.log('Now writing to output');
			res.write(html);
			console.log('Completed writing to output');
			//end connection:
			res.end();
			console.log("Request answered and connection ended.")
		}

		// Writing JSON
		if(req.method == 'POST' && pathname != '/login'){

			console.log('Method verified as POST. Initializing WRITING JSON Module.');
			if(appConfig.verbose) console.log('[200] ' + req.method + ' to req.url = ' + req.url);
		    //read form data as string
		    var formData = '';

		    if(appConfig.verbose) console.log('start formData = ' + formData);
			if(appConfig.verbose) console.log('trying to read incoming data');
	    	
	    	req.on('data', function(data) {
		    	formData += data.toString();
		    });

			//end request
		    req.on('end', function() {
		      // empty 200 OK response for now
		      	if(appConfig.verbose && formData === '') console.log('read failed. no data or event did not fire.')
		    	if(appConfig.verbose && formData !== '') console.log('Completed reading data. formData = \n' + formData);
		    	postToJSON(path, formData);

		    });

		    var JSONToAdd = {/*
				"idea": "lorem ipsum lorem ipsum",
				"ideaDescription": "lorem ipsum lorem ipsum",
				"ideaTags": [
					{
						"key": "tag 1"
					},
					{
						"key": "tag 2"
					}
				],
				"category": "educated",
				"contributor": "userName"*/
		    }
		    try{
		    	console.log('trying to post to JSON at ' + path);
		    	//postToJSON(path, formData);
		    	console.log('completed post to JSON');
		    } catch(err) {
		    	console.log("didn't work");
		    	console.log(err);
		    } finally {
		    	console.log('Completed attempt to post to JSON');
		    }
		} else {
			console.log('[405] ' + req.method + ' to ' + req.url);
			res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
			res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		}
	};
	//http.createServer(onRequest).listen(ideaPort, ideaServer);
	app.listen(process.env.PORT || ideaPort, process.env.YOUR_HOST || ideaServer);
	console.log('Ideacity up and running at http://' + ideaServer + ':' + ideaPort + '/ from server.js');
};
 
 console.log('exporting Start');
 exports.Start = Start;
 exports.app = app;
 exports.passport = passport;

 console.log('Start exported');

//Deprecated createserver function
/*http.createServer(function (req, res) {
	//Node Server Callback function

	//serve index.html
	if(req.url === "/index" || req.url === "/"){
		//content type library
		var contentTypesByExtension = {
		    '.html': "text/html",
		    '.css':  "text/css",
		    '.js':   "text/javascript"
		  };




		fs.readFile("index.html", function(err, data) {
			if(err) {
				res.writeHead(404);
				res.write("Whoops! There's a problem! 404 not found.");
			} else {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
			}
			res.end();
		});	
	} else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<b>Hey there!</b><br /><br /> Something went wrong. This is the default response. Requested url is: ' + req.url + '<br /><br />You should try <a href="/index.html">index.html</a>');
		res.end();
	};
}).listen(ideaPort, ideaServer);
*/

