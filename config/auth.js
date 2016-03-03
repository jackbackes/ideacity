// config/auth.js

console.log('getting config.auth.')
var url = require('url');
var path = require('path');

var callbackHost = url.host;
console.log('callbackHost: ' + callbackHost);

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '249810685350711', // your App ID
        'clientSecret'  : '563a7044844acdf0ac19cad67929bc45', // your App Secret
        'callbackURL'   : 'http://ideacity.herokuapp.com/auth/facebook/callback',
        'localCallbackURL' : 'http://localhost:5000/auth/facebook/callback',
        'testCallbackURL' : 'http://ideacityTest.herokuapp.com/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};