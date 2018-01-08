var User = require('../api/user/userModel');
var Post = require('../api/post/postModel');
var Category = require('../api/category/categoryModel');
var logger = require('./logger');
var _ = require('lodash');

logger.log('Starting seeding');

var users = [
  {username: 'Jimmylo', password: 'test'},
  {username: 'Xoko', password: 'test'},
  {username: 'katamon', password: 'test'}
];

var categories = [
  {name: 'intros'},
  {name: 'angular'},
  {name: 'UI/UX'}
];

var posts = [
  {title: 'Learn angular 2 today', text: 'Angular to is so dope'},
  {title: '10 reasons you should love IE7', text: 'IE7 is so amazing'},
  {title: 'Why we switched to Go', text: 'go is dope'}
];

var clearDB = function(){
	var models = [User,Post,Category];
	logger.log('...Clearing DB');	
	var promises = models.map(function(model){
		return model.remove().exec();
	});

	return Promise.all(promises);
}

var createDoc = function(Model,doc){
	return Model(doc).save();
};

var createUser = function(){
	var promises = users.map(function(user){
		return createDoc(User,user);
	});
	return Promise.all(promises);
}	

var createCategory = function(data){
	var promises = categories.map((category)=>{
		return createDoc(Category,category);
	})
	return Promise.all(promises).then((categories)=>{
		return _.merge({categories:categories},{users:data});
	});	
}

var createPosts = function(data){
	var promises = posts.map((post)=>{
		post.author = data.users[0];
		post.categories = data.categories[0];
		return createDoc(Post,post);
	});
	return Promise.all(promises).then(()=>{
	return 'Seeded DB with 3 Posts, 3 Users, 3 Categories';

	});
}

clearDB()
.then(createUser)
.then(createCategory)
.then(createPosts)
.then(logger.log)
.catch((err)=>{
	logger.error(err);
});
