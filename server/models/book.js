const mongoose = require('mongoose');
const dbschema = mongoose.Schema;

const bookSchema = new dbschema({
  name: String,
  genre: String,
  authorId: String,
});

module.export = mongoose.model('Book', bookSchema);
