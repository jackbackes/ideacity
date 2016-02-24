// the pageserver was initialized in js.js
console.log('loading pageserver');
var path = require('path');
var fs = require('fs');
console.log('requirements complete');
// Serves the page by returning the html.
var serve = function(path) {

	var html = '';

	try {
		console.log('reading file from pageserver.js');
		html = fs.readFileSync(path);
	} catch (err) {
		console.log('Reading file was unsuccessful. Oops.');
		html = 'ERROR';
	}

	return html;
};

// returns the type of file aka filename extension
var reqtype = function(path) {

	var type = '';

	var pathSplit = path.split('.');
	if (pathSplit === 1) {
		// If for some reason there's no ending, output as a plain text file
		type = 'plain';
	} else {
		type = pathSplit[1]; //Returns the part after the '.' seperator
	}

	return type;
};


console.log('starting exports');
exports.serve = serve;
exports.reqtype = reqtype;
