//File: controllers/tvshows.js
var mongoose = require('mongoose');
var RAuthors  = mongoose.model('Authors');

//GET - Return all tvshows in the DB
exports.findAllAuthors = function(req, res) {
	RAuthors.find(function(err, authors) {
    if(err) res.send(500, err.message);

    console.log('GET /Authors')
		res.status(200).jsonp(authors);
	});
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	RAuthors.findById(req.params.id, function(err, author) {
    	if(err) return res.send(500, err.message);

    	console.log('GET /authors/' + req.params.id);
		res.status(200).jsonp(author);
	});
};

//POST - Insert a new TVShow in the DB
exports.addAuthor = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var author = new RAuthors({
		name:    req.body.name,
		biography: 	  req.body.biography,
		birthdate:  req.body.birthdate,
		nationality:  req.body.nationality,
	});

	author.save(function(err, author) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(author);
	});
};

//PUT - Update a register already exists
exports.updateAuthor = function(req, res) {
	RAuthors.findById(req.params.id, function(err, author) {
		author.name=  req.body.name;
		author.biography= req.body.biography;
		author.birthdate= req.body.birthdate;
		author.nationality= req.body.nationality;
		author.save(function(err) {
			if(err) return res.send(500, err.message);
    	res.status(200).jsonp(author);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteAuthor = function(req, res) {
	console.log('DELETE');
	RAuthors.findById(req.params.id, function(err, author) {
    	author.remove(function(err) {
			if(err) return res.send(500, err.message);
			console.log('delete /author')
    		res.status(200);
		});
	});
};
