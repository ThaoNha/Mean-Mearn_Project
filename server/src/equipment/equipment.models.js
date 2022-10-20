const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },
  status: { type: String, require: true, default: 'empty' },
  description: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'users', default: null },
  createAt: { type: Date, default: Date.now },
  createBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
  modifyAt: { type: Date, default: Date.now },
  modifyBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
});
module.exports = mongoose.model('equipments', EquipmentSchema);
