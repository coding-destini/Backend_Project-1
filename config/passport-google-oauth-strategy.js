const passport = require('passport')
const googleStrategy = require('passport-google-oauth');
const crypto = require('crypto')
const User = require('../models/user')

//Telling passport to use google Strategy 
passport.use(new googleStrategy({
    clientID :"281459693774-305jhq5a02foa2n92n7hsenqgqjo4feu.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:800/users/auth/google/callback"
},

// Callback function 
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(error,user){
        if(error){console.log('error in google-strategy-passport',error);return;}
        console.log(profile);
        if(user){return done(null,user)}
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }, function(err,user){
                if(error){console.log('error in creating User google-strategy-passport',error);return;}
                return done(null,user)
            })
        }
    })
}
))

module.exports = passport;