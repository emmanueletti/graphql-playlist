const mongoose = require('mongoose');
const dbschema = mongoose.Schema;

const authorSchema = new dbschema({
  name: String,
  age: Number,
  authorId: Number,
  // id is automatically generated by mongoose
});

module.exports = mongoose.model('Author', authorSchema);
