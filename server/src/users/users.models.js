const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  createAt: { type: Date, default: Date.now },
  refreshToken: { type: String, default: 'null' },
  accessToken: { type: String, default: 'null' },
});

module.exports = mongoose.model('users', UserSchema);
