//Router is initialized in js.js
var path = require('path');


//Router configuration
var isTest = 'y';

//Routes the request, so that a proper file can be found for it!
var route = function(pathname) {
	console.log('\n\nrouter initialized');
	var path = process.cwd() + '\/'; //Sets up the path to the
	// current directory, the one
	// that will contain the pages.

	console.log('Process.cwd: ' + process.cwd());

	// If the file ending has been corrected beforehand,
	var corrected = false;

	//otherwise,
	if (pathname === '' || pathname === 'index' || pathname === 'home' || pathname === 'index.html' || pathname === 'home.html') {
		// If it should be routed to the home page.
		if(isTest === 'y') {
			path += 'indextest.html'; //set to test page
		} else if (isTest === 'n') {
			path += 'index.html'; //set to index page
		} else {
			path += 'index.html'; //set to test page and throw configuration error to console
			console.log('app configuration error. please restart server and enter y or n when prompted');
		}

		corrected = true; //set corrected to true
	} else {

		// but... if it isn't any of those, then just append the pathname
		path += pathname;
	}

	// Split it using the '.' seperator. If the length of the split is only one
	// then no file type has been specified, and so one will be generated.
	var pathSplit = pathname.split('.');

	console.log('pathSplit: ' + pathSplit);
	console.log('path: ' + path);

	if(pathSplit.length === 1 && corrected === false) {
		// If the split leaves length of one, then appen .html to the end.
		path += '.html';

	}


	console.log('Path is: ' + path);
	return path; //returns the path!
}

exports.route = route;