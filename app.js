var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/authors', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models = require('./models/readbook');
var models2 = require('./models/author');
var controller = require('./controllers/controller');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var books = express.Router();

books.route('/books')
  .get(controller.findAllBooks)
  .post(controller.addBook);

books.route('/books/:id')
  .get(controller.findById)
  .put(controller.updateBook)
  .delete(controller.deleteBook);

app.use('/api', books);

var authors = express.Router();

authors.route('/authors')
  .get(controller.findAllAuthors)
  .post(controller.addAuthor);

authors.route('/authors/:id')
  .get(controller.findById)
  .put(controller.updateAuthor)
  .delete(controller.deleteAuthor);

app.use('/api', authors);

// Start server
app.listen(process.env.PORT, function() {
  console.log("Node server running on http://localhost:"+process.env.PORT);
});