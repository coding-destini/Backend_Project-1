const passport = require('passport');
const JWTStrategy =require('passport-jwt').Strategy;

//a module which will help us extract JWT from the header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

//Read Docs
let option = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : "CodeBook" 
}

//Telling passport to use JWT Strategy
passport.use(new JWTStrategy(option, function(jwtPayLoad,done){

User.findById(jwtPayLoad._id,function(err,user){
    if(err){
        console.log("Error in finding user from JWT"); return;
    }

    if(user){
        return done(null,user);
    }
    else{
        return done(null,false);
    }
})
}))

module.exports = passport;