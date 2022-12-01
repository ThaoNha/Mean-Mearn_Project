const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  name: { type: String, require: true, unique: true },
  type: { type: Schema.Types.ObjectId, ref: 'type', default: null },
  description: { type: String },
  status: {
    type: String,
    enum: ['available', 'borrowed', 'repairing', 'deleted'],
    default: 'available',
  },
});
module.exports = mongoose.model('equipment', EquipmentSchema);
