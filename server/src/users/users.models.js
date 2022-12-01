const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {type: Number, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
  refreshToken: { type: String, default: null },
  status: { type: String ,enum: ['activate','block','delete'], default: 'activate' },
});

module.exports = mongoose.model('users', UserSchema);
