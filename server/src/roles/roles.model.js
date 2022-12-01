const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String, require: true, unique: true  }
});

module.exports = mongoose.model('roles', RoleSchema);
