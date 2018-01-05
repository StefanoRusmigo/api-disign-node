var app = require('./server');
var request = require('supertest');
var chai = require('chai').expect;	

describe('[LIONS]',function(){
  var lion = { name:'bigLion',
			   pride:'bigPride',
			   age:3,
			   gender:'male',
			   id:'1'
			   };

  it('should get all lions',function(done){
  	request(app)
  	.get('/lions')
  	.set('Accept','application/json')
  	.expect('Content-Type',/json/)
  	.end(function(err,res){
  		chai(res.body).to.be.an('array');
  		done();
  	});
  });

  it('should create new lion',function(done){
  	request(app)
  	.post('/lions')
  	.send(lion)
  	.set('Accept','application/json')
  	.expect('Content-type',/json/)
  	.end(function(err,res){
  		chai(res.body).to.be.an('object');
  		chai(res.body.id).to.equal('1');
  		chai(res.body).to.eql(lion);
  		done();
  	});
  });

  it('should get the created lion',function(done){
  	request(app)
  	.get('/lions/1')
  	.end(function(err,res){
  		chai(res.body).to.eql(lion);
  		done();
  	});
  });

  it('should update existing lion', function(done){
  	request(app)
  	.put('/lions/1')
  	.send({name:'changed'})
  	.expect('Content-type',/json/)
  	.end(function(err,res){
  		chai(res.body).to.be.an('object');
  		chai(res.body.name).to.eql('changed');
  		lion.name = 'changed';
  		chai(res.body).to.eql(lion);
  		done();
  	});
  });

  it('should delete existing lion',function(done){
  	request(app)
  	.delete('/lions/1')
  	.end(function(err,res){
  		chai(res.body).to.be.an('object');
  		chai(res.body).to.eql(lion);
  		done();
  	});
  	request(app).get('lions/1')
  	.end(function(err,res){
  		chai(res.body).to.be.an('object');
  		chai(res.body).to.be.empty;
  	});
  });
});