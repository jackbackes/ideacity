//configuration settings for the app


/*module.exports={
	'facebook_api_key'		: 	'FB APP ID',
	'facebook_api_secret'	: 	'FB API SECRET',
	'callback_url'			: 	'http://localhost:3000/auth/facebook/callback',
	'use_database'			: 	'false',
	'host'					: 	'localhost',
	'username'				: 	'root',
	'password' 				: 	'',
	'database' 				: 	'DB NAME'
}*/

app.configure(function () {
	app.use(express.cookieParser());
	app.use(express.session({secret: 'example'}));
	app.use(express.bodyParser());
	app.use(checkAuth);
	app.use(app.router);
	app.set('view engine': 'jade');
	app.set('view options': {'layout':'false'});
});

