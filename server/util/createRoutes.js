var _ = require('lodash');


module.exports =  function(Model,modelName,populate=false){

return{


 params(req, res, next) {
  let id = req.params.id;
  console.log(id)
  Model.findById(id)
    .then(function(doc) {
      if (!doc) {
        next(new Error('No '+modelName+' with that id'));
      } else {
        req.doc = doc;
        next();
      }
    }, function(err) {
      next(err);
    });
},

get(req, res, next) {
	if(populate){
	 Model.find()
  	 .populate('author category')
  	 .exec()
  	 .then((docs)=>{
    res.send(docs);
  },(err)=> next(err));
	}else{
		Model.find()
		.then((doc)=>{
			res.send(doc);
		},(err)=> {next(err)})
	}

},

getOne(req, res, next) {
  var doc = req.doc;
  res.json(doc);
},

put(req, res, next) {
  var doc = req.doc;

  var update = req.body;

  _.merge(doc, update);

  doc.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
},

post(req, res, next) {
  var newdoc = req.body;

  Model.create(newdoc)
    .then(function(doc) {
      res.json(doc);
    }, function(err) {
      next(err);
    });
},
delete(req, res, next) {
  req.doc.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
},

}
}


