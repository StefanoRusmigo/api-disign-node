var router = require('express').Router();
var logger = require('../../util/logger');
var posts = require('./postController');
var auth = require('../../auth/auth');
authAry =	[auth.decodeToken(),auth.getFreshUser()];
// setup boilerplate route jsut to satisfy a request
// for building

router.use('/:id',posts.routes.params);

router.route('/')
  .get(posts.routes.get)
  .post(authAry,posts.post);

router.route('/:id')
.get(posts.routes.getOne)
.put(authAry,posts.routes.put)
.delete(authAry,posts.routes.delete);

module.exports = router;
