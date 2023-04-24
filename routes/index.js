// Evterytime i do require express, it will not create a new instance of express, it will fetch the existing express 
const express = require('express');

const router = express.Router();
//created a homecontroller variable which require controller To access home comtroller function 
const homeController = require('../controller/home_controller');
//just to know router is loaded in outer index.js sucessfully 
console.log("Router is loaded")

router.get('/',homeController.home);
router.use('/setting',homeController.setting);

router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));
// for any further routes, access from here 
// router.use('/router.name',require('./routerFile'))



//I need to export this to be available to index.js , where we will use it 
module.exports=router; 
// Once we export the router we need to tell app to use it. Do you remember we did(app.use,app.get), so we need to tell app, all the get post everthing will be handle by this module now