const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentiction using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},
//callback fun()
async (email,password,done)=>{
 try {
       //find user and establish the identity
    let user= await User.findOne({email:email});
        if(!user || user.password!=password){
           console.log("Invalid Username/Password");
           return done(null,false);
        }
        //if above condition will not run means user in real means it is founded
        return done(null,user);
 } catch(error) {
 console.log("Error in finding User ---> Passport");
 return done(error);
 }
}
));


//serialinzing the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
//deserializing the user from the key in the cookies
passport.deserializeUser( async (id,done)=>{
    //find user if it is exist on DB
    try {
       let user = await User.findById(id);
        return done(null,user);
    }
    catch (error) {
        console.log("Error in finding User ---> Passport");
        return done(err);
    }
 
})

passport.checkAuthentication= (req,res,next)=>{
    //if user is sign in , the pass on the req to the next function(controller's actoin)
    if(req.isAuthenticated()){
        return next();
    }
    //if user not sign in the retrun to sign in page
    return res.redirect('/users/sign-in');
}

//whenever user sign in taht information is in req.user, and i trannsferred it to res.locals.user for 'views'
passport.setAuthenticatedUser = (req,res,next)=>{
if(req.isAuthenticated()){
    res.locals.user = req.user;
}
next();
}

module.exports=passport;