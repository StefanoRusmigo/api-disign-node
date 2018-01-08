var logger = require('../util/logger');

module.exports = function(){
	return function(err,req,res,next){
	  if(err.message == 'UnauthorizedError'){
	  	return res.status(401).send('Invalid Token')
	  }

	  logger.error(err.stack);
  	  res.status(500).send('Oops');
}
}