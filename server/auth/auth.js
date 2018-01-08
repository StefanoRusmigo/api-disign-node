var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJWT({secret:config.secrets.jwt});
var User = require('../api/user/userModel');

exports.decodeToken = function(){
	return function(req,res,next){
		if(req.query && req.query.hasOwnProperty('accessToken')){

			req.headers.authorization = 'Bearer '+ req.query.accessToken;
		}
		checkToken(req,res,next);
	}
}

exports.getFreshUser = function(){

	return function(req,res,next){
		User.findById(req.user._id)
		.then((doc)=>{
			req.user = doc;
		})
		.catch((e)=>{
			next(e);
		});
	}
}
exports.verifyUser = function(){
	return function(req,res,next){

		var username = req.body.username;
		var password = req.body.password;

		if(!username || !password){
         	res.status(400).send('Enter Username and password');
      	}else{
          User.findOne({username:username})
          .then((doc)=>{
            if(!doc){
             	res.status(401).send('No user with username ' + username)
            }else{
              if(doc.authenticate(password)){
              	req.user = doc;
              	next();
              }else res.status(401).send('Password dont match');
            }
        },(err)=>{next(err)} )
      } 
	}
}

exports.signToken = function(id){
	return jwt.sign({_id:id},config.secrets.jwt,{expiresIn:config.jwtExpires});
}