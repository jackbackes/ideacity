// app/routes.js
module.exports = function(app, passport, express) {
    console.log('loading routes');

    //Router configuration
    var path = require('path');
    var isTest = 'y';


    // =====================================
    // LOAD CSS and scripts
    // =====================================

    // GET /style.css etc
    app.use(express.static(__dirname + '/public'));

    // =====================================
    // RECEIVE POST  =======================
    // =====================================

    app.post('/acceptIdeas', function(req, res){
        console.log('starting post');
        var fs = require('fs');

        console.log('requiring ideas.JSON');
        var jsonObj = null;
        var jsonObj = JSON.parse(fs.readFileSync('./public/private/ideas.json'));
        //jsonObj = require('../public/private/ideas.json');

        console.log('adding req.body to jsonObj');
        console.log(jsonObj.length);
        console.log(jsonObj.ideas.length);
        var newIdea = JSON.stringify(req.body);
        jsonObj.ideas[jsonObj.ideas.length] = req.body;
        console.log(jsonObj.ideas.length);
        var newJSONObj = JSON.stringify(jsonObj, null, 4);
        console.log(newJSONObj);
        try{fs.writeFileSync('./public/private/ideas.json',newJSONObj);} catch(err) {console.log(err)};
        res.end();

//old
        /*
        try{
            console.log('Current working directory (app.post): ' + process.cwd());
            //postToJSON.postToJSON('../public/private/ideas.JSON', formData);
            //new content for testing
            var ideaCity = fs.readFileSync('/public/private/ideas.JSON').toString();
            try{console.log('ideaCity: ' + ideaCity);} catch(err) {
                console.log(err);
            }



            //end new content
            res.end('success');
        } catch(err) {
                console.log('Could not write to JSON: ' + err);
                res.status('500').end('error writing to JSON');
        };


        if(app.locals.appConfig.verbose) console.log('[200] ' + req.method + ' to req.url = ' + req.url);
        //read form data as string

        if(app.locals.appConfig.verbose) console.log('start formData = ' + formData);
        if(app.locals.appConfig.verbose) console.log('trying to read incoming data');
        
        req.on('data', function(data) {
            if(app.locals.appConfig.verbose) console.log('writing: ' + data + console.log(formData));
            formData += data.toString();
        });

        //end request
        req.on('end', function() {
          // empty 200 OK response for now
            if(app.locals.appConfig.verbose && formData === '') console.log('read failed. no data or event did not fire.')
            if(app.locals.appConfig.verbose && formData !== '') console.log('Completed reading data. formData = \n' + formData);
            //postToJSON(path, formData);
        });
        */


    });


    
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        //var loginCheck = isUserLoggedIn();
        res.render('index.ejs', {
            user : req.user // get the user out of session and pass to template
        }); // load the index.ejs file
    });

    // =====================================
    // CARDS                        ========
    // =====================================

    app.get('/cards', function(req, res) {
        res.render('cards.ejs'); // load the cards.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { 
        scope : 'email',
        callbackURL: '/auth/facebook/callback' 
    }));


    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
        }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { 
                message: req.flash('loginMessage') 
            });
        });


        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));



    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};

};



