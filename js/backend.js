//the Node server backend for Ideacity

var ideaServer = '127.0.0.1';
var ideaPort = 1337;
var http = require('http');
var fs = require("fs");


http.createServer(function (req, res) {
	//Node Server Callback function

	//serve index.html
	if(req.url === "/index" || req.url === "/"){
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

console.log('Ideacity up and running at http://' + ideaServer + ':' + ideaPort + '/');
