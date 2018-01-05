var router = require('express').Router();
var logger = require('../../util/logger');
var posts = require('./postController');
// setup boilerplate route jsut to satisfy a request
// for building

router.use('/:id',posts.params);

router.route('/')
  .get(posts.get)
  .post(posts.post);

router.route('/:id')
.get(posts.getOne)
.put(posts.put)
.delete(posts.delete);

module.exports = router;
