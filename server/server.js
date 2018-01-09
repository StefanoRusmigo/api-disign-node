var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var mongoose = require('mongoose');
// db.url is different depending on NODE_ENV
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url, { useMongoClient: true } );

if(config.seed){
	require('./util/seed');
}

// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api/', api);
app.use('/auth', require('./auth/routes'));

// set up global error handling
app.use(require('./middleware/err'));
// export the app for testing
module.exports = app;
