const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  name: { type: String, require: true },
  type: { type: Schema.Types.ObjectId, ref: 'type', default: null },
  status: { type: String, require: true, default: 'status' },
  description: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'users', default: null },
});
module.exports = mongoose.model('equipment', EquipmentSchema);
