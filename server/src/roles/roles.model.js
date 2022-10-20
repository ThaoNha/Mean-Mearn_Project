const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  keyword: { type: String, require: true, unique: true },
  name: { type: String },
  createAt: { type: Date, default: Date.now },
  createBy: {type: Schema.Types.ObjectId, ref: 'users', default: null },
  modifyAt: { type: Date, default: Date.now },
  modifyBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
});

module.exports = mongoose.model('roles', RoleSchema);
