// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        fullName     : String,
        phone        : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        avatar       : String,
        link         : String,
        gender       : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    info             : {
        createdAt    : Date,
        updatedAt    : Date,
        admin        : Boolean      
    },
    int              : {
        comments     : Array,
        ideas        : Array,
        contributions: Array,
        score        : Number    
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);