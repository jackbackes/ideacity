// app/models/idea.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var ideaSchema = mongoose.Schema({

	idea 			 : String,
	description		 : String,
	category		 : String,
	createdAt		 : Date,
	updatedAt		 : Date,
	tags			 : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        tag: String
    }],
	postedBy		 : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contributors	 : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    images: [{
    	ref: String
    }],
    likes: {
    	count: Number,
    	likers: [{
	        type: mongoose.Schema.Types.ObjectId,
	        ref: 'User'
	    }],
    }

});

// methods ======================




// create the model for users and expose it to our app
module.exports = mongoose.model('Idea', ideaSchema);