var router = require('express').Router();
var logger = require('../../util/logger');
var categories = require('./categoryController');

// setup boilerplate route jsut to satisfy a request
// for building
router.use('/:id',categories.params);

router.route('/')
  .get(categories.get)
  .post(categories.post);

router.route('/:id')
.get(categories.getOne)
.put(categories.put)
.delete(categories.delete);

module.exports = router;
