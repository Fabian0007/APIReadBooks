var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/readbooks', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/readbook')(app, mongoose);
var bookCtrl = require('./controllers/readbooks');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var books = express.Router();

books.route('/books')
  .get(bookCtrl.findAllBooks)
  .post(bookCtrl.addBook);

books.route('/books/:id')
  .get(bookCtrl.findById)
  .put(bookCtrl.updateBook)
  .delete(bookCtrl.deleteBook);

app.use('/api', books);

// Start server
app.listen(process.env.PORT, function() {
  console.log("Node server running on http://localhost:"+process.env.PORT);
});