const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
  refreshToken: { type: String, default: null },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'status' },
});

module.exports = mongoose.model('users', UserSchema);
