var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var authorSchema = new Schema({  
    name: String,
    biography: String,
    birthdate: Date,
    nationality: String
});

module.exports = mongoose.model('Authors', authorSchema); 