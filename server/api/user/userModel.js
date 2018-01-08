var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password:{
  	type:String,
  	required:true
  }
});

UserSchema.pre('save',function(next){
	if(!this.isModified('password'))return next();
	this.password = this.encrypt(this.password);
	next();
});

UserSchema.methods = {
	authenticate: function(textPass){
		return bcrypt.compareSync(textPass,this.password);
	},

	encrypt: function(textPass){
		if(!textPass){
			return ''
		}else{
		    var salt = bcrypt.genSaltSync(10);
      		return bcrypt.hashSync(textPass, salt);
		}

	}
}

module.exports = mongoose.model('user', UserSchema);
