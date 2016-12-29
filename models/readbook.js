var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var bookSchema = new Schema({  
  title:    { type: String },
  year:     { type: Number },
  authors:  { type : [String] },
  description:  { type: String },
  review:  { type: String },
  poster:   { type: String },
  stars:  { type: Number },
});

module.exports = mongoose.model('Books', bookSchema);