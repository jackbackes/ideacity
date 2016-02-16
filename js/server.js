//the Node server backend for Ideacity

var ideaServer = '127.0.0.1';
var ideaPort = 1337;
var http = require('http');
var url = require('url');


//start the service
var Start = function(route, serve, reqtype) {
	// Launched when there is a request.
	var onRequest = function(req, res) {

		//Extracts the pathname from the url
		var pathname = url.parse(req.url).pathname;

		// Removes the starting '/'. If this fails, then the request
		// was without the '/', so it is not affected
		try {
			pathname = pathname.substring(1, pathname.length);
		} catch(err) {

		}

		// Responds to all requests apart from that for favicon.ico
		if (pathname !== 'favicon.ico') {
			console.log('Request has been received');

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

			//Writes what type of data will be sent. Dynamically sets the file ending.
			res.writeHead(200, {
				'Content-Type' : 'text/' + type
			});

			//Writes to output
			console.log('Writing to output');
			res.write(html);
			console.log('Written to output');
			//end connection:
			res. end();
			console.log("Request answered and connection ended.")
		}
	};
	http.createServer(onRequest).listen(ideaPort, ideaServer);
	console.log('Ideacity up and running at http://' + ideaServer + ':' + ideaPort + '/ !!!');
};
 
 exports.Start = Start;


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

