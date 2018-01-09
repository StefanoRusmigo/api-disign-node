var Post = require('./postModel');

exports.routes = require('../../util/createRoutes')(Post,'post',true);


exports.post = function(req, res, next) {
  var newdoc = req.body;
  newdoc.author = req.user;
  Post.create(newdoc)
    .then(function(doc) {
      res.json(doc);
    }, function(err) {
      next(err);
    });
}