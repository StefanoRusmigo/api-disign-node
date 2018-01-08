var router = require('express').Router();
var verifyUser = require('./auth').verifyUser();
var auth = require('./Controller').signin;

router.route('/')
	
.post(verifyUser,auth)


module.exports = router;