const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  name: { type: String, require: true, unique: true  },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active',
  },
});

module.exports = mongoose.model('type', TypeSchema);
