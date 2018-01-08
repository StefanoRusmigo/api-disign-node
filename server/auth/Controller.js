var signToken = require('./auth').signToken;

exports.signin = function(req,res,next){
	var id = req.user._id;
	var token = signToken(id);

	res.send({token:token});
}