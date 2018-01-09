var router = require('express').Router();
var logger = require('../../util/logger');
var categories = require('./categoryController');
var auth = require('../../auth/auth');
authAry =	[auth.decodeToken(),auth.getFreshUser()];
// setup boilerplate route jsut to satisfy a request
// for building
router.use('/:id',categories.params);

router.route('/')
  .get(categories.get)
  .post(authAry,categories.post);

router.route('/:id')
.get(categories.getOne)
.put(authAry,categories.put)
.delete(authAry,categories.delete);

module.exports = router;
