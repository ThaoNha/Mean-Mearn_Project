const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String, require: true, unique: true },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active',
  },
});

module.exports = mongoose.model('roles', RoleSchema);
