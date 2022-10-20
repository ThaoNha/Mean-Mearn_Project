const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  refreshToken: { type: String, default: null },
  accessToken: { type: String, default: null },
  createAt: { type: Date, default: Date.now },
  modifyAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', UserSchema);
