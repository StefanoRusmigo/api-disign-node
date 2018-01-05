var Post = require('./postModel');

module.exports = require('../../util/createRoutes')(Post,'post',true);
