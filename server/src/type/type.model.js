const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  _id: { type: String, require: true, unique: true  },
  name: { type: String, require: true, unique: true  }
});

module.exports = mongoose.model('type', TypeSchema);
