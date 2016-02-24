// the pageserver was initialized in js.js
console.log('loading pageserver');
var path = require('path');
var fs = require('fs');

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

// POST to JSON

var postToJSON = function(url, JSONToAppend) {
	console.log('attempting to post - from server.js');
	console.log('requiring ideaCity');
	var ideaCity = fs.readFileSync(url).toString();
	console.log('require successful \nparsing ideaCity to ideaCityParsed');
	var ideaCityParsed = JSON.parse(ideaCity);
	ideaCityParsed.ideas[ideaCityParsed.ideas.length] = JSON.parse(JSONToAppend);
	console.log('parsing successful\nre-stringification test');
	console.log(JSON.stringify(ideaCityParsed, null, "\t"));
	fs.writeFile(url, JSON.stringify(ideaCityParsed, null, "\t"), function(err) {
		if (err) throw err;
		console.log('The JSON was appended successfully to ' + url);
	});
};

exports.serve = serve;
exports.reqtype = reqtype;
exports.postToJSON = postToJSON;