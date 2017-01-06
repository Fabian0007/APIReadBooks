var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    cors = require('cors');

// Connection to DB
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
                
var mongodbUri = 'mongodb://fabian0007:fabian0007@ds157268.mlab.com:57268/bdbooks';
//var mongodbUri = 'mongodb://localhost/bdbooks';
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  console.log("Successful connection");                         
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

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