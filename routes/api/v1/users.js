const express=require('express');
const router=express.Router();
const userApi = require('../../../controller/api/v1/user_api');

router.post('/create-session',userApi.createSession);
module.exports=router;