const express = require('express');
const router = express.Router();
const postApi = require('../../../controller/api/v1/posts_api')
const passport = require('passport')

router.get('/',postApi.index);

router.delete('/:id',passport.authenticate('jwt', {session:false}),postApi.destroy);
//In this context, session: false means that the Passport authentication strategy should not use session-based authentication. By setting this option to false, the server will not create a session for the authenticated user after the authentication process is complete.

module.exports = router;