const mongoose = require('mongoose');
const dbschema = mongoose.Schema;

const authorSchema = new dbschema({
  name: String,
  authorId: Number,
});

module.export = mongoose.model('Author', authorSchema);
