const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/users_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/address',userController.address);
router.get('/sign-up',userController.SignUp);
router.get('/sign-in',userController.SignIn);
router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);

router.get('/sign-out',userController.destroySession);

module.exports=router;