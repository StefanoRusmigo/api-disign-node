var logger = require('../util/logger');

module.exports = function(err,req,res,next){
	  if(err.message === 'No authorization token was found'){
	  	return res.status(401).send('Invalid Token')
	  }

	  logger.error(err.stack);
  	  res.status(500).send('oops: '+ err.message);
}
