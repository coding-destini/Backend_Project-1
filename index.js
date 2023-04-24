const express = require('express');
const app = express();
const port=8000;
const expressLayouts  =require('express-ejs-layouts');
const mongoose = require('./config/mongoose');
const cookieParser=require('cookie-parser');
// Used for session cookies 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { db } = require('./config/mongoose');

const MongoStore=require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));


app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
//Extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'))

// set up view engine 
app.set('view engine','ejs');
app.set('views','./views');
//Using express Router
// app.use => again a middleware, before the server start up it needs to access this (routes/index.js) route 


//middileware which take session and encrypt it
app.use(session({
    name:'Codebook',
    secret:"CodingDestin123", //key to decode and encode the encryption/ Later we will generate this automatically
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100) // for expire session like we see in bank system
    },
    store: MongoStore.create({
      
        mongoUrl : "mongodb://0.0.0.0:27017/social_media_3",
         autoremove : "disabled",
     },function(err){
         console.log("error at mongo store",err || "connection established to store cookie");
     })
}));


// Tell app to use passport 
app.use(passport.initialize());

//helps in maintaining session
app.use(passport.session());
//Whenever passpoer is initialized this fun() called , it will chack wheather session is beign present or not , if present then user will be set in locals, and is accessabvle in views
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error is running the server : ${err}`);
    }
    console.log(`Server is running successfully running  port : ${port}`);
})