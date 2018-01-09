var User = require('./userModel');
var auth = require('../../auth/auth')
exports.routes = require('../../util/createRoutes')(User,'user');

exports.userPost = function(req, res, next) {
  var newdoc = req.body;
  User.create(newdoc)
    .then(function(doc) {
     var token =  auth.signToken(doc._id);
      res.json({token:token});
    }, function(err) {
      next(err);
    });
}

exports.me = function(req,res,next){
	res.json(req.user);
}