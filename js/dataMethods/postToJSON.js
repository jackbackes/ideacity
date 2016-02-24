//postToJSON method

// POST to JSON

var path = require('path');
var fs = require('fs');

var postToJSON = function(url, JSONToAppend) {
	console.log('attempting to post to ' + url + ' - from server.js');
	console.log('Current working directory (post to JSON): ' + process.cwd());
	console.log('requiring ideaCity');
	var ideaCity = fs.readFileSync(url, function(err) {
						if (err) throw err;
						console.log('The JSON was appended successfully to ' + url);
					}).toString();
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



// exporting method as postToJSON module
exports.postToJSON = postToJSON;