//File: controllers/tvshows.js
var mongoose = require('mongoose');
var RBooks  = mongoose.model('Books');

//GET - Return all tvshows in the DB
exports.findAllBooks = function(req, res) {
	RBooks.find(function(err, books) {
    if(err) res.send(500, err.message);

    console.log('GET /books')
		res.status(200).jsonp(books);
	});
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	RBooks.findById(req.params.id, function(err, book) {
    	if(err) return res.send(500, err.message);

    	console.log('GET /books/' + req.params.id);
		res.status(200).jsonp(book);
	});
};

//POST - Insert a new TVShow in the DB
exports.addBook = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var book = new RBooks({
		title:    req.body.title,
		year: 	  req.body.year,
		authors:  req.body.authors,
		description:  req.body.description,
		review:  req.body.review,
		poster:   req.body.poster,
		stars:  req.body.stars,
	});

	book.save(function(err, book) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(book);
	});
};

//PUT - Update a register already exists
exports.updateBook = function(req, res) {
	RBooks.findById(req.params.id, function(err, book) {
		book.title   = req.body.petId;
		book.year    = req.body.year;
		book.country = req.body.country;
		book.poster  = req.body.poster;
		book.seasons = req.body.seasons;
		book.genre   = req.body.genre;
		book.summary = req.body.summary;

		book.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(book);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteBook = function(req, res) {
	RBooks.findById(req.params.id, function(err, book) {
		book.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};