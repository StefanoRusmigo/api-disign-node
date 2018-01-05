var router = require('express').Router();
var logger = require('../../util/logger');
var users = require('./userController');

// setup boilerplate route jsut to satisfy a request
// for building
router.use('/:id',users.params);

router.route('/')
  .get(users.get)
  .post(users.post);

router.route('/:id')
.get(users.getOne)
.put(users.put)
.delete(users.delete);

module.exports = router;
