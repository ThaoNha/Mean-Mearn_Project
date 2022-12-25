const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
  refreshToken: { type: String, default: null },
  status: {
    type: String,
    enum: ['active', 'block', 'deleted'],
    default: 'active',
  },
});

module.exports = mongoose.model('users', UserSchema);
