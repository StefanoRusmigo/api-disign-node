var router = require('express').Router();
var logger = require('../../util/logger');
var users = require('./userController');
var auth = require('../../auth/auth');
authAry =	[auth.decodeToken(),auth.getFreshUser()];

// setup boilerplate route jsut to satisfy a request
// for building
router.get('/me',authAry,users.me);

router.use('/:id',users.routes.params);

router.route('/')
  .get(users.routes.get)
  .post(users.userPost);

router.route('/:id')
.get(users.routes.getOne)
.put(authAry,users.routes.put)
.delete(authAry,users.routes.delete);

module.exports = router;
